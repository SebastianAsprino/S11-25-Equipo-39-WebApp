export interface CountState
{
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	setCount: (value: number) => void;
}
