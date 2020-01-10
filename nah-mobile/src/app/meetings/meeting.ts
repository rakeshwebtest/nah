export interface Meeting {
    id: number;
    title: string;
    agenda: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    imageUrl: string;
    group: {
        name: string
    }
    createdBy: {
        id: number;
        displayName: string;
        imageUrl: string;
        city: {
            name: string;
        }
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
