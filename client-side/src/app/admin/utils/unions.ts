export interface TableColumn {
    key?: string;
    label?: string;
    searchable?: number;
}

export enum SearchModes {
    Input,
    Dropdown,
    FromTo,
}

export enum ParkingZoneColumnKey {
    Id = 'id',
    Name = 'name',
    Price = 'price',
    Address = 'address',
    Available = 'available',
    CarId = 'car_id'
}

export enum ParkingHistoryColumnKey {
    Id = 'history_id',
    UserId = 'user_id',
    CarId = 'car_id',
    Mark = 'mark',
    Type = 'type',
    LicenseNumber = 'license_number',
    ZoneId = 'zone_id',
    Name = 'name',
    Address = 'address',
    Price = 'price',
    Available = 'available',
}