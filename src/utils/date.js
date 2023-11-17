export const mydate = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const timeSend = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return timeSend;
};

export const formatTime = (timeSend) => {
    const currentTime = new Date();
    const messageTime = new Date(timeSend);
    const timeDifference = (currentTime - messageTime) / 1000; // Chuyển đổi thành giây

    if (timeDifference < 60) {
        return 'just now';
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes}m ago`;
    } else if (timeDifference < 86400) {
        // Dưới 24 giờ
        const hours = Math.floor(timeDifference / 3600);
        return `${hours}h ago`;
    } else {
        const day = messageTime.getDate();
        const month = messageTime.getMonth() + 1;
        const hour = messageTime.getHours();
        const minute = messageTime.getMinutes();
        return `${day}/${month} ${hour}:${String(minute).padStart(2, '0')}`;
    }
};

export const isSameDay = (date) => {
    const currentDate = new Date();
    return (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
};

export const formatISODateToCustomFormat = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return date.toLocaleString('en-US', options);
};
