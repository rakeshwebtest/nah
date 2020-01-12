export interface Meeting {
    id: number;
    title: string;
    agenda: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    imageUrl: string;
    group: {
        name: string;
    }
    location: string;
    city: {
        name: string;
    }
    createdBy: {
        id: number;
        displayName: string;
        imageUrl: string;

    }
    members?: Member[];
    isMember?: boolean;
    isCreatedBy?: boolean;
}
interface Member {
    id: number;
    user: {
        id: number;
        displayName: string;
        imageUrl: string;
    }
}
