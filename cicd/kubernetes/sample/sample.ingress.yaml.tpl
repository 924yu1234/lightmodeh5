apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ SERVICE_NAME }}
  namespace: {{ NAMESPACE }}
spec:
  rules:
    - host: domain
      http:
        paths:
          - path: /operation
            pathType: ImplementationSpecific
            backend:
              service:
                name: {{ SERVICE_NAME }}
                port:
                  number: 80
