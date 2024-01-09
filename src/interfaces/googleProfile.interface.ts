interface googleUserProfile {
    id: string;
    userType: userType;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    emails: {
        value: string;
        verified: boolean;
    }[]
    displayName: string;
    photos: {
        value: string;
    }[]
}

enum userType {
    WRITER,
    MANAGER,
    ADMIN,
    SUPER_ADMIN,
    CLIENT
}

export type { googleUserProfile }