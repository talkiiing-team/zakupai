export type EmailNotificationChannel = { id: number, type: 'email'; email: string };
export type TelegramNotificationChannel = { id: number, type: 'telegram'; user_id: string };

export type NotificationChannel =
    | EmailNotificationChannel
    | TelegramNotificationChannel;

export async function getNotificationChannels() {
    const res = await fetch('https://api.закуп-ай.рф/notification_channels/', { 
        method: 'GET',
    });

    return await res.json() as Array<NotificationChannel>;
}

export async function createEmailNotificationChannels(email: string) {
    await fetch(`https://api.закуп-ай.рф/notification_channels/email?email=${email}`, {
        method: 'POST',
    });
}