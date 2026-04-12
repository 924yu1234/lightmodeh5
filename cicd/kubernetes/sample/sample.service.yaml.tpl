apiVersion: v1
kind: Service
metadata:
  labels:
    app: {{ SERVICE_NAME }}
  name: {{ SERVICE_NAME }}
  namespace: {{ NAMESPACE }}
spec:
  clusterIP: None
  clusterIPs:
    - None
  ports:
    {% for port in ports %}
    - name: {{ port.name }}
      port: {{ port.port }}
      protocol: {{ port.protocol }}
      targetPort: {{ port.targetPort }}
    {% endfor %}
  selector:
    app: {{ SERVICE_NAME }}
  sessionAffinity: None
  type: ClusterIP
