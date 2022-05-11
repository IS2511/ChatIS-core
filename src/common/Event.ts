
declare interface EventType<TargetType, DataType> {
    target: TargetType
    data: DataType
    constructor: (data: DataType, target: TargetType) => EventType<TargetType, DataType>
}
