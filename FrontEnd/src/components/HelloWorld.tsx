import React from 'react';

const HelloWorld: React.FC = () =>
{
	return (
		<div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-10 max-w-lg mx-auto text-white">
			<div className="text-center">
				<div className="text-6xl mb-6">👋</div>
				<h2 className="text-4xl font-bold mb-4">¡Hola Mundo!</h2>
				<p className="text-lg opacity-90 leading-relaxed">
					Bienvenido al componente HelloWorld con un diseño moderno y atractivo usando Tailwind CSS.
				</p>
			</div>
		</div>
	);
};

export default HelloWorld;