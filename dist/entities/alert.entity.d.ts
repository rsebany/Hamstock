export declare enum AlertType {
    EXPIRY = "EXPIRY",
    ENVIRONMENT = "ENVIRONMENT"
}
export declare class Alert {
    id: number;
    type: AlertType;
    severity: string;
    message: string;
    resolved: boolean;
    createdAt: Date;
    updatedAt: Date;
}
