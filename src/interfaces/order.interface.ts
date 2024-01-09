interface Order {
    id: string;
    orderType?: Order_type;
    writerId?: string;
    name: string;
    topic: string;
    description: string;
    subject: Subject;
    pages: number;
    words?: number;
    createdAt?: Date;
    updatedAt?: Date;
    clientDeadline: Date;
    writerDeadline?: Date;
    price: number;
    educationLevel: Education_level;
    status: Order_status;
    writerRating?: number;
    userId?: string;
    assignedById?: string;
    clientId?: string;
    isArchived?: boolean;
    File?: File[];
    submissions?: Submission[];
}

enum Education_level {
    HIGH_SCHOOL,
    UNDERGRADUATE,
    COLLEGE,
    MASTERS,
    PHD,
    OTHER
}

enum FileType {
    ORDER_FILE,
    SUBMISSION_FILE
}

enum Order_status {
    NEW,
    AVAILABLE,
    UNCONFIRMED,
    INPROGRESS,
    COMPLETED,
    CANCELLED,
    REVISION,
    DISPUTE,
    REFUNDED,
    EDITING
}

enum Order_type {
    ESSAY,
    RESEARCH_PAPER,
    TERM_PAPER,
    COURSEWORK,
    CASE_STUDY,
    BOOK_REVIEW,
    ARTICLE_REVIEW,
    ANNOTATED_BIBLIOGRAPHY,
    BOOK_REPORT,
    MOVIE_REVIEW,
    MOVIE_CRITIQUE,
    ARTICLE,
    ARTICLE_CRITIQUE,
    REACTION_PAPER,
    LETTER,
    REFLECTION_PAPER,
    LAB_REPORT,
    LAB_WORK,
    SPEECH,
    PRESENTATION,
    POWERPOINT_PRESENTATION,
    MATH_PROBLEM,
    STATISTICS_PROJECT,
    RESEARCH_SUMMARY,
    THESIS,
    DISSERTATION,
    THESIS_PROPOSAL,
    DISSERTATION_PROPOSAL,
    RESEARCH_PROPOSAL,
    ADMISSION_ESSAY,
    SCHOLARSHIP_ESSAY,
    PERSONAL_STATEMENT,
    EDITING,
    PROOFREADING,
    REWRITING,
    RESUME,
    CV,
    COVER_LETTER,
    OTHER
}

enum Subject {
    MATH,
    SCIENCE,
    ENGLISH,
    BIOLOGY,
    HISTORY,
    GEOGRAPHY,
    CHEMISTRY,
    PHYSICS,
    LITERATURE,
    ECONOMICS,
    ENGINEERING,
    COMPUTER_SCIENCE,
    BUSINESS,
    LAW,
    PHILOSOPHY,
    PSYCHOLOGY,
    POLITICAL_SCIENCE,
    SOCIOLOGY,
    STATISTICS,
    ACCOUNTING,
    PROGRAMMING,
    OTHER,
    SOCIAL_STUDIES,
    SOCIAL_SCIENCE
}

enum User_type {
    WRITER,
    CLIENT,
    SUPER_ADMIN,
    ADMIN,
    MANAGER
}

interface Submission {
    id: string;
    orderId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    File: any[];
}

export type { Order, Education_level, FileType, Order_status, Order_type, Subject, User_type, Submission };