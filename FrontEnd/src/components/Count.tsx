import React from 'react';
import { create } from 'zustand';
import type { CountState } from '../interfaces/components/Count.type';

const useCountStore = create<CountState>((set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
	decrement: () => set((state) => ({ count: state.count - 1 })),
	reset: () => set({ count: 0 }),
	setCount: (value: number) => set({ count: value }),
}));


const Count: React.FC = () =>
{
	const { count, increment, decrement, reset } = useCountStore();

	// Función para determinar el color del gradiente basado en el valor
	const getGradientColor = () =>
	{
		if (count > 0) return 'from-green-400 to-emerald-500';
		if (count < 0) return 'from-red-400 to-orange-500';
		return 'from-blue-400 to-cyan-500';
	};

	// Función para determinar el color del texto del número
	const getTextColor = () =>
	{
		if (count > 0) return 'text-green-600';
		if (count < 0) return 'text-red-600';
		return 'text-blue-600';
	};

	return (
		<div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
			<div className="text-center">
				{/* Círculo del contador con gradiente dinámico */}
				<div className={`w-24 h-24 bg-linear-to-r ${getGradientColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 transform hover:scale-105`}>
					<span className={`text-3xl font-bold text-white drop-shadow-md`}>
						{count}
					</span>
				</div>

				<h2 className="text-3xl font-bold text-gray-800 mb-2">Componente Count</h2>
				<p className="text-gray-600 mb-6 leading-relaxed">
					Contador gestionado con Zustand
				</p>

				{/* Display del valor actual */}
				<div className="mb-6 p-4 bg-gray-50 rounded-lg">
					<span className="text-sm text-gray-500 block mb-1">Valor actual:</span>
					<span className={`text-2xl font-bold ${getTextColor()}`}>
						{count}
					</span>
				</div>

				{/* Botones de acción */}
				<div className="flex flex-wrap gap-3 justify-center mb-4">
					<button
						onClick={decrement}
						className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
					>
						<span className="text-lg">-</span>
						Decrementar
					</button>

					<button
						onClick={increment}
						className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
					>
						<span className="text-lg">+</span>
						Incrementar
					</button>
				</div>

				{/* Botón de reset */}
				<button
					onClick={reset}
					className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium shadow hover:shadow-md active:scale-95"
				>
					Reiniciar a 0
				</button>

				{/* Información adicional */}
				<div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
					<p className="text-sm text-blue-700">
						💡 El color del círculo cambia según el valor:
						<span className="font-semibold"> Verde</span> para positivos,
						<span className="font-semibold"> Rojo</span> para negativos,
						<span className="font-semibold"> Azul</span> para cero.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Count;