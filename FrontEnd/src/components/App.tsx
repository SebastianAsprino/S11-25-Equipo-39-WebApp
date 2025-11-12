// App.tsx
import React, { useEffect } from 'react';
import { useVistaStore } from '../stores/AppStore';
import Count from './Count';
import HelloWorld from './HelloWorld';

const App: React.FC = () =>
{
	const { vista, setVista } = useVistaStore();

	// Función para cambiar la vista
	const cambiarVista = (nuevaVista: number) =>
	{
		setVista(nuevaVista);
	};

	// Renderizado condicional basado en el estado
	const renderVista = () =>
	{
		if (vista === -1)
		{
			return (
				<div className="flex justify-center items-center min-h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
					<span className="ml-3 text-lg text-gray-600">Cargando...</span>
				</div>
			);
		}

		switch (vista)
		{
			case 1:
				return (
					<div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">Contenido Principal</h2>
						<p className="text-gray-600 leading-relaxed">
							Bienvenido a la vista principal. Aquí puedes navegar entre diferentes secciones
							usando los botones de arriba para explorar las funcionalidades de la aplicación.
						</p>
					</div>
				);
			case 2:
				return <Count />;
			case 3:
				return <HelloWorld />;
			default:
				return (
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto text-center">
						<h3 className="text-lg font-semibold text-yellow-800 mb-2">Vista no encontrada</h3>
						<p className="text-yellow-600">La vista solicitada no está disponible.</p>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
			{/* Header con botones de navegación */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-4 sm:space-y-0">
						<div className="text-center sm:text-left">
							<h1 className="text-3xl font-bold text-gray-900 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text">
								Vista Principal
							</h1>
							<p className="text-gray-500 mt-1">Navega entre las diferentes secciones</p>
						</div>

						{/* Botones de navegación */}
						<div className="flex flex-wrap justify-center gap-3">
							<button
								onClick={() => cambiarVista(1)}
								className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${vista === 1
										? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
										: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
									}`}
							>
								📊 Main
							</button>
							<button
								onClick={() => cambiarVista(2)}
								className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${vista === 2
										? 'bg-green-600 text-white shadow-lg shadow-green-200'
										: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
									}`}
							>
								🔢 Count
							</button>
							<button
								onClick={() => cambiarVista(3)}
								className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${vista === 3
										? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
										: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
									}`}
							>
								👋 HelloWorld
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Contenido principal */}
			<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{renderVista()}
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 mt-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="text-center text-gray-500 text-sm">
						<p>© 2024 Mi Aplicación React. Todos los derechos reservados.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;