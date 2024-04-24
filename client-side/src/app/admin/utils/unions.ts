export interface ITableColumn {
    key?: string;
    label?: string;
    searchable?: number;
    dropdown?: IDropdown[];
    getVal: (value: string) => {};
}

export interface IDropdown {
    value: any;
    label: string;
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
    Id = 'id',
    UserId = 'user_id',
    CarId = 'car_id',
    Mark = 'mark',
    Model = 'model',
    Type = 'type',
    LicenseNumber = 'license_number',
    ZoneId = 'zone_id',
    Name = 'name',
    Address = 'address',
    Price = 'price',
    Available = 'available',
}

export enum CarColumnKey {
    Id = 'id',
    UserId = 'user_id',
    Mark = 'mark',
    Model = 'model',
    Type = 'type',
    LicenseNumber = 'license_number',
    ZoneId = 'zone_id',
}