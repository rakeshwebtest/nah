export interface Meeting {
    id: number;
    title: string;
    agenda: string;
    contactMobile: string;
    contactEmail: string;
    meetingDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    imageUrl: string;
    contactInfo: string;
    group: {
        name: string;
        isDeleted: number;
    }
    location: string;
    city: {
        name: string;
    }
    createdBy: {
        id: number;
        displayName: string;
        imageUrl: string;
        typeOfNoer: string;

    }
    comments?: any[];
    members?: Member[];
    photos?: Photo[];
    videos?: any[];
    isMember?: boolean;
    isCreatedBy?: boolean;
    isPublished?: number;
    isCanceled?: number;
    isSuspend?: boolean;
}
interface Photo {
    imagePath: string;
    id: number;

}
interface Member {
    id: number;
    user: {
        id: number;
        displayName: string;
        imageUrl: string;
    }
}
