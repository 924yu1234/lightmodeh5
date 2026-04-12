apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app: {{ SERVICE_NAME }}
  name: {{ SERVICE_NAME }}
  namespace: {{ NAMESPACE }}
spec:
  podManagementPolicy: {{ POD_MANAGEMENT_POLICY | default(OrderedReady) }}
  replicas: {{ REPLICAS | default(1) }}
  revisionHistoryLimit: 1024
  selector:
    matchLabels:
      app: {{ SERVICE_NAME }}
  serviceName: {{ SERVICE_NAME }}
  template:
    metadata:
      annotations:
        prometheus.io/path: /metrics
        prometheus.io/port: "9111"
        prometheus.io/scrape: "true"
      labels:
        app: {{ SERVICE_NAME }}
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: worker
                operator: In
                values:
                - "true"
      containers:
      - name: {{ SERVICE_NAME }}
        image: {{ IMAGE }}
        imagePullPolicy: IfNotPresent
        lifecycle:
          postStart:
            exec:
              command: {% raw %}{{ lifecycle.postStart.exec.command }}{% endraw %}
          preStop:
            exec:
              command: {% raw %}{{ lifecycle.preStop.exec.command }}{% endraw %}
        livenessProbe:
          failureThreshold: 3
          initialDelaySeconds: {% raw %}{{ livenessProbe.initialDelaySeconds }}{% endraw %}
          periodSeconds: 10
          successThreshold: 1
          tcpSocket:
            port: {% raw %}{{ livenessProbe.tcpSocket.port }}{% endraw %}
          timeoutSeconds: 30
        readinessProbe:
          failureThreshold: 3
          initialDelaySeconds: {% raw %}{{ readinessProbe.initialDelaySeconds }}{% endraw %}
          periodSeconds: 10
          successThreshold: 1
          tcpSocket:
            port: {% raw %}{{ readinessProbe.tcpSocket.port }}{% endraw %}
          timeoutSeconds: 30
        resources:
          limits:
            cpu: {% raw %}{{ resources.limits.cpu }}{% endraw %}
            memory: {% raw %}{{ resources.limits.memory }}{% endraw %}
          requests:
            cpu: {% raw %}{{ resources.requests.cpu }}{% endraw %}
            memory: {% raw %}{{ resources.requests.memory }}{% endraw %}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /log
          name: shared-log
        - mountPath: /host-logs
          name: host-logs
        - mountPath: /usr/local/app/env/app-config
          name: app-config
          readOnly: true
          subPath: app-config
        - mountPath: /usr/local/app/env/app-secret
          name: app-secret
          readOnly: true
          subPath: app-secret
      - name: fluentd-sidecar
        command:
        - sh
        - -c
        - /usr/local/bin/ruby /usr/local/bundle/bin/fluentd --config /fluentd/etc/fluent.conf
          --plugin /fluentd/plugins
        env:
        - name: APP_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: metadata.name
        - name: POD_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: metadata.name
        - name: NAMESPACE
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: metadata.namespace
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        image: registry.degate.space/base/fluentd:v1.15-9
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            cpu: 500m
            memory: 512M
          requests:
            cpu: 10m
            memory: 10M
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /log
          name: shared-log
        - mountPath: /host-logs
          name: host-logs
        - mountPath: /fluentd/etc/config
          name: fluentd-sidecar
      dnsPolicy: ClusterFirst
      imagePullSecrets:
      - name: private-registry
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
      - name: host-logs
        hostPath:
          path: /data/log
          type: DirectoryOrCreate
      - name: shared-log
        emptyDir: {}
      - name: fluentd-sidecar
        configMap:
          defaultMode: 420
          name: fluentd-sidecar
      - name: app-secret
        secret:
          defaultMode: 256
          optional: false
          secretName: app-secret
      - name: app-config
        configMap:
          defaultMode: 256
          name: app-config
          optional: false
  updateStrategy:
    rollingUpdate:
      partition: 0
    type: RollingUpdate
