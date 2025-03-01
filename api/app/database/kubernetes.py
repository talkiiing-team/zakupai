from kubernetes import client, config
from kubernetes.config import ConfigException

try:
    config.load_incluster_config()
except ConfigException:
    config.load_kube_config()
