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
