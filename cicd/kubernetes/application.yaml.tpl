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
        - image: {{ IMAGE }}
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
              memory: 32Mi
          securityContext:
            capabilities: {}
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          env:
            - name: APP_NAME
              value: {{ SERVICE_NAME }}
          volumeMounts:
            - mountPath: /var/www/html/
              name: cdn-static-volume
            - mountPath: /usr/local/app/env/app-config
              name: app-config
              readOnly: true
              subPath: app-config
            - mountPath: /usr/local/app/env/app-secret
              name: app-secret
              readOnly: true
              subPath: app-secret
      dnsPolicy: ClusterFirst
      imagePullSecrets:
        - name: private-registry
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
        - name: cdn-static-volume
          persistentVolumeClaim:
            claimName: cdn-static-pvc
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



---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: {{ SERVICE_NAME }}
  name: {{ SERVICE_NAME }}
  namespace: {{ NAMESPACE }}
spec:
  clusterIP: {{ SERVICE_CLUSTER_IP }}
  clusterIPs:
    - {{ SERVICE_CLUSTER_IP }}
  ports:
    - name: port80
      port: 80
      protocol: TCP
      targetPort: 80
    - name: port8000
      port: 8000
      protocol: TCP
      targetPort: 8000
    - name: port8080
      port: 8080
      protocol: TCP
      targetPort: 8080
    - name: port9090
      port: 9090
      protocol: TCP
      targetPort: 9090
    - name: port9111
      port: 9111
      protocol: TCP
      targetPort: 9111
  selector:
    app: {{ SERVICE_NAME }}
  sessionAffinity: None
  type: ClusterIP
