apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: {{ SERVICE_NAME }}
  name: {{ SERVICE_NAME }}
  namespace: {{ NAMESPACE }}
spec:
  progressDeadlineSeconds: 600
  replicas: {{ REPLICAS | default(1) }}
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: {{ SERVICE_NAME }}
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
    type: RollingUpdate
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
      - env:
        - name: CONSUL_PATH
          value: {{ APP_CONSUL_PATH }}
        - name: MAIN_IMAGE
          value: {{ IMAGE }}
        - name: CONSUL_SERVER
          valueFrom:
            secretKeyRef:
              key: CONSUL_SERVER
              name: consul-secret
              optional: false
        - name: CONSUL_TOKEN
          valueFrom:
            secretKeyRef:
              key: CONSUL_TOKEN
              name: consul-secret
              optional: false
        image: {{ IMAGE }}
        imagePullPolicy: IfNotPresent
        livenessProbe:
          failureThreshold: 3
          initialDelaySeconds: 10
          periodSeconds: 10
          successThreshold: 1
          tcpSocket:
            port: 80
          timeoutSeconds: 30
        name: {{ SERVICE_NAME }}
        readinessProbe:
          failureThreshold: 3
          initialDelaySeconds: 10
          periodSeconds: 10
          successThreshold: 1
          tcpSocket:
            port: 80
          timeoutSeconds: 30
        resources:
          limits:
            cpu: 1000m
            memory: 1024Mi
          requests:
            cpu: 10m
            memory: 16Mi
        securityContext:
          capabilities: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /data/memory
          name: ts-mem-vol
        - mountPath: /tmp/
          name: consul-volume
        - mountPath: /host-logs
          name: host-logs
        - mountPath: /log
          name: my-data
        - mountPath: /usr/local/app/env/app-config
          name: app-config
          readOnly: true
          subPath: app-config
        - mountPath: /usr/local/app/env/app-secret
          name: app-secret
          readOnly: true
          subPath: app-secret

      - command:
        - sh
        - -c
        - /usr/local/bin/ruby /usr/local/bundle/bin/fluentd --config /fluentd/etc/fluent.conf
          --plugin /fluentd/plugins
        env:
        - name: APP_NAME
          value: {{ SERVICE_NAME }}
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
        name: fluentd-sidecar
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 10m
            memory: 16Mi
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /log
          name: my-data
        - mountPath: /host-logs
          name: host-logs
        - mountPath: /fluentd/etc/config
          name: fluentd-sidecar
      dnsPolicy: ClusterFirst
      imagePullSecrets:
      - name: private-registry
      initContainers:
      - args:
        - "0"
        command:
        - sleep
        image: {{ IMAGE }}
        imagePullPolicy: IfNotPresent
        name: get-image-{{ SERVICE_NAME }}
        resources: {}
        securityContext:
          capabilities: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      - args:
        - /andui/get-config.py
        command:
        - /usr/bin/python3
        env:
        - name: CONSUL_PATH
          value: {{ APP_CONSUL_PATH }}
        - name: MAIN_IMAGE
          value: {{ IMAGE }}
        - name: CONSUL_SERVER
          valueFrom:
            secretKeyRef:
              key: CONSUL_SERVER
              name: consul-secret
              optional: false
        - name: CONSUL_TOKEN
          valueFrom:
            secretKeyRef:
              key: CONSUL_TOKEN
              name: consul-secret
              optional: false
        image: registry.degate.space/devops/get-config:2.0.0-10
        imagePullPolicy: IfNotPresent
        name: get-consul
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /tmp/
          name: consul-volume
        # 前端不需要
        - mountPath: /shared-sql/
          name: sql-volume
        - mountPath: /var/run/docker.sock
          name: docker-sock
      - command:
        - sh
        - -c
        - mkdir -p /host-logs/$(POD_NAME) && ln -s /host-logs/$(POD_NAME) /log/app
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: metadata.name
        image: busybox
        imagePullPolicy: Always
        name: volume-setup
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /host-logs
          name: host-logs
        - mountPath: /log
          name: my-data
      - env:
        - name: CONSUL_PATH
          value: {{ APP_CONSUL_PATH }}
        - name: IMAGE_ID
          value: 1.0.0-86-5bfeefdb-testnet
        - name: CONSUL_SERVER
          valueFrom:
            secretKeyRef:
              key: CONSUL_SERVER
              name: consul-secret
        - name: CONSUL_TOKEN
          valueFrom:
            secretKeyRef:
              key: CONSUL_TOKEN
              name: consul-secret
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              key: DB_USER
              name: database-migrator-secret
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              key: DB_PASS
              name: database-migrator-secret
        - name: SLACK_PASS
          valueFrom:
            secretKeyRef:
              key: SLACK_PASS
              name: database-migrator-secret
        image: registry.degate.space/backend/dg-database-migrator:1.0.0-1-5b68b415-testnet
        imagePullPolicy: IfNotPresent
        name: dg-database-migrator
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /sql/
          name: sql-volume
        - mountPath: /log
          name: my-data
        - mountPath: /host-logs
          name: host-logs
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
      - hostPath:
          path: {{ EFS_PATH_PREFIX }}/ts
          type: ""
        name: ts-mem-vol
      - emptyDir: {}
        name: consul-volume
      - hostPath:
          path: /var/run/docker.sock
          type: ""
        name: docker-sock
      - hostPath:
          path: /data/log
          type: DirectoryOrCreate
        name: host-logs
      - emptyDir: {}
        name: my-data
      - configMap:
          defaultMode: 420
          name: fluentd-sidecar
        name: fluentd-sidecar
      - emptyDir: {}
        name: sql-volume
      - name: app-secret
        secret:
          defaultMode: 256
          optional: false
          secretName: app-secret
      - configMap:
          defaultMode: 256
          name: app-config
          optional: false
        name: app-config