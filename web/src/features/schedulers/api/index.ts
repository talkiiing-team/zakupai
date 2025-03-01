export interface Scheduler {
  metadata: Metadata
  spec: Spec
}

export interface Metadata {
  annotations: Annotations
  creation_timestamp: string
  name: string
  namespace: string
}

export interface Annotations {
  "zakupai.notification_channel_id": string
  "zakupai.scheduler_uid": string
}

export interface Spec {
  schedule: string
}

export async function getSchedulers() {
    const res = await fetch('https://api.закуп-ай.рф/schedulers/', { 
        method: 'GET',
    });

    return await res.json() as Scheduler[];
}

export interface CreateSchedule {
  target: string, notificationChannelIds: (number | string)[], cron: string
}

export async function createSchedule(data: CreateSchedule) {
  await fetch("https://api.xn----7sbbznd9a5a.xn--p1ai/schedulers/", {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
    },
    "body": JSON.stringify({ ...data, notification_channel_ids: data.notificationChannelIds }),
    "method": "POST",
  });
}

export async function removeSchedule(uid: string) {
  await fetch("https://api.xn----7sbbznd9a5a.xn--p1ai/schedulers/", {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
    },
    "body": JSON.stringify({ uid }),
    "method": "DELETE",
  });
}
