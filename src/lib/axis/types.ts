import type {
	ScaleBand,
	ScaleContinuousNumeric,
	ScaleDiverging,
	ScalePoint,
	ScaleQuantile,
	ScaleQuantize,
	ScaleSequentialBase,
	ScaleThreshold
} from 'd3';

export type Scale =
	| ScaleContinuousNumeric<any, any>
	| ScaleBand<any>
	| ScalePoint<any>
	| ScaleDiverging<any>
	| ScaleQuantile<any>
	| ScaleQuantize<any>
	| ScaleSequentialBase<any>
	| ScaleThreshold<any, any, any>;
