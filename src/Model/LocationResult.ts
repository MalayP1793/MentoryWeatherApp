interface LocationResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number | null;
    feature_code: string;
    country_code: string;
    country_id: number;
    country: string;
    timezone: string;

    admin?: {
        admin1_id?: number;
        admin2_id?: number;
        admin3_id?: number;
        admin4_id?: number;
        admin1?: string;
        admin2?: string;
        admin3?: string;
        admin4?: string;
    };

    population?: number;
    postcodes?: string[];
}
