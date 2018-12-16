module Models {

    export interface LoginResult {
        success: boolean;
        errors: string[];
        token: string;
    }

}
