
INSERT INTO `category` (`id`, `name`, `description`, `url`) VALUES
(1, 'Casas', 'Casas en alquiler', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar3.jpg'),
(2, 'Cabañas', 'Cabañas en alquiler', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores2.jpg'),
(3, 'Glampings', 'Glampings en alquiler', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota1.jpg'),
(4, 'Apartamentos', 'Apartamentos en alquiler', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt1.jpg'),
(5, 'Casas campestres', 'Casas campestres en alquiler', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc1.avif');

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id`, `name`, `country_id`) VALUES
(1, 'Buenos Aires', 1),
(2, 'La Plata', 1),
(3, 'Mar del Plata', 1),
(4, 'Córdoba', 1),
(5, 'Mendoza', 1),
(6, 'San Carlos de Bariloche', 1),
(7, 'Bogotá', 5),
(8, 'Medellín', 5),
(9, 'México D.F.', 13),
(10, 'Lima', 17),
(11, 'Magangué', 5);

--
-- Volcado de datos para la tabla `country`
--

INSERT INTO `country` (`id`, `name`, `abbreviation`) VALUES
(1, 'Argentina', 'AR'),
(2, 'Bolivia', 'BO'),
(3, 'Brasil', 'BR'),
(4, 'Chile', 'CH'),
(5, 'Colombia', 'CO'),
(6, 'Costa Rica', 'CR'),
(7, 'Cuba', 'CU'),
(8, 'Ecuador', 'EC'),
(9, 'El Salvador', 'SV'),
(10, 'Guatemala', 'GT'),
(11, 'Haití', 'HT'),
(12, 'Honduras', 'HN'),
(13, 'México', 'MX'),
(14, 'Nicaragua', 'NI'),
(15, 'Panamá', 'PA'),
(16, 'Paraguay', 'PY'),
(17, 'Perú', 'PE'),
(18, 'Republica Dominicana', 'DO'),
(19, 'Uruguay', 'UY'),
(20, 'Venezuela', 'VE');

--
-- Volcado de datos para la tabla `image`
--

INSERT INTO `image` (`id`, `title`, `url`, `product_id`) VALUES
(1, 'image casa La Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/1/casa_curutchet_unesco1.jpg', 1),
(2, 'image casa La Plata2', 'https://dp6yqogbniva6.cloudfront.net/casas/1/clasicos-de-arquitectura-casa-curutchet-le-corbusier_34.jpg', 1),
(3, 'image casa La Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/1/HJm4L2KVe_312x240.jpg', 1),
(4, 'image casa La Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/1/images.jpeg', 1),
(5, 'image casa La Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/1/Sy-kV8nKEg_720x0.jpg', 1),
(6, 'image casa Mar del Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar1.jpg', 2),
(7, 'image casa Mar del Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar2.jpg', 2),
(8, 'image casa Mar del Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar3.jpg', 2),
(9, 'image casa Mar del Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar4.jpg', 2),
(10, 'image casa Mar del Plata', 'https://dp6yqogbniva6.cloudfront.net/casas/2/mar5.jpg', 2),
(11, 'image Cabaña Las Marias', 'https://dp6yqogbniva6.cloudfront.net/cabanas/1/marias1.jpg', 3),
(12, 'image Cabaña Las Marias', 'https://dp6yqogbniva6.cloudfront.net/cabanas/1/marias2.jpg', 3),
(13, 'image Cabaña Las Marias', 'https://dp6yqogbniva6.cloudfront.net/cabanas/1/marias3.jpg', 3),
(14, 'image Cabaña Las Marias', 'https://dp6yqogbniva6.cloudfront.net/cabanas/1/marias4.jpg', 3),
(15, 'image Cabaña Las Marias', 'https://dp6yqogbniva6.cloudfront.net/cabanas/1/marias5.jpg', 3),
(16, 'image Cabaña de Colores', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores1.jpg', 4),
(17, 'image Cabaña de Colores', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores2.jpg', 4),
(18, 'image Cabaña de Colores', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores3.jpg', 4),
(19, 'image Cabaña de Colores', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores4.jpg', 4),
(20, 'image Cabaña de Colores', 'https://dp6yqogbniva6.cloudfront.net/cabanas/2/colores5.jpg', 4),
(21, 'image Glamping Estilo Florida', 'https://dp6yqogbniva6.cloudfront.net/glampings/1/mendoza1.jpg', 5),
(22, 'image Glamping Estilo Florida', 'https://dp6yqogbniva6.cloudfront.net/glampings/1/mendoza2.jpg', 5),
(23, 'image Glamping Estilo Florida', 'https://dp6yqogbniva6.cloudfront.net/glampings/1/mendoza3.jpg', 5),
(24, 'image Glamping Estilo Florida', 'https://dp6yqogbniva6.cloudfront.net/glampings/1/mendoza4.png', 5),
(25, 'image Glamping Estilo Florida', 'https://dp6yqogbniva6.cloudfront.net/glampings/1/mendoza5.png', 5),
(26, 'image Glamping Hermitage', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota1.jpg', 6),
(27, 'image Glamping Hermitage', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota2.jpg', 6),
(28, 'image Glamping Hermitage', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota3.jpg', 6),
(29, 'image Glamping Hermitage', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota4.jpg', 6),
(30, 'image Glamping Hermitage', 'https://dp6yqogbniva6.cloudfront.net/glampings/2/bogota5.jpg', 6),
(31, 'image Apartamento Bs. As.', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt1.jpg', 7),
(32, 'image Apartamento Bs. As.', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt2.jpg', 7),
(33, 'image Apartamento Bs. As.', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt3.jpg', 7),
(34, 'image Apartamento Bs. As.', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt4.jpg', 7),
(35, 'image Apartamento Bs. As.', 'https://dp6yqogbniva6.cloudfront.net/apartamento/1/apt5.jpg', 7),
(36, 'image Apartamento La Plata', 'https://dp6yqogbniva6.cloudfront.net/apartamento/2/apt1.avif', 8),
(37, 'image Apartamento La Plata', 'https://dp6yqogbniva6.cloudfront.net/apartamento/2/apt2.avif', 8),
(38, 'image Apartamento La Plata', 'https://dp6yqogbniva6.cloudfront.net/apartamento/2/apt3.avif', 8),
(39, 'image Apartamento La Plata', 'https://dp6yqogbniva6.cloudfront.net/apartamento/2/apt4.avif', 8),
(40, 'image Apartamento La Plata', 'https://dp6yqogbniva6.cloudfront.net/apartamento/2/apt5.avif', 8),
(41, 'image Casa campestre Córdoba', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/1/cc1.avif', 9),
(42, 'image Casa campestre Córdoba', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/1/cc2.avif', 9),
(43, 'image Casa campestre Córdoba', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/1/cc3.webp', 9),
(44, 'image Casa campestre Córdoba', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/1/cc4.avif', 9),
(45, 'image Casa campestre Córdoba', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/1/cc5.avif', 9),
(46, 'image Casa campestre Mendoza', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc1.avif', 10),
(47, 'image Casa campestre Mendoza', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc2.avif', 10),
(48, 'image Casa campestre Mendoza', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc3.avif', 10),
(49, 'image Casa campestre Mendoza', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc4.jpg', 10),
(50, 'image Casa campestre Mendoza', 'https://dp6yqogbniva6.cloudfront.net/casas_campestres/2/cc5.jpg', 10);

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `short_description`, `active`, `address`, `latitude`, `longitude`, `area`, `average_score`, `category_id`, `city_id`, `site_policies`, `hse_policies`, `cancellation_policies`) VALUES
(1, 'Casa en La Plata', 'Hermosa casa en el centro de La Plata. Luminosa, con cálidos ambientes. 2 plantas, 4 habitaciones, 2 baños, parque y piscina.', '', 1, 'Calle 5 y 49', '-37.9702777', '-57.5955626', '150', 6, 1, 2, 'Check-out: 10:30. En esta propiedad no está permitido realizar despedidas de solteros ni fiestas similares. No se permite fumar', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(2, 'Casa en Mar del Plata', 'Hermosa casa junto a la playa. Cuenta con 3 dormitorios, TV de pantalla plana con canales por cable, cocina equipada con microondas y heladera, lavarropas y 2 baños con bidet.', '', 1, 'Mar del plata 123', '-37.9702777', '-57.5955626', '150', 4, 1, 3, 'Check-out: 10:00. No se permiten fiestas', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(3, 'Cabaña Las Marias', 'En el corazón de Córdoba, disfruta de un albergue cerca de las montañas. Un dormitorio matrimonial. Cocina/comedor y estar c/camas de 1 plaza. Cochera cubierta. Amplia galería con parrilla.', '', 1, 'Cordoba 123', '-37.9702777', '-57.5955626', '200', 8, 2, 4, 'Check-out: 10:00. No se permiten fiestas. No se permite fumar', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(4, 'Cabaña De Colores', 'De Colores está localizado en San Carlos de Bariloche. Cuenta con piscina climatizada y wi-fi gratis en zonas comunes, además de servicio de masajes. Entre las comodidades se destacan estacionamiento gratis y información turística.', '', 1, 'Bariloche 123', '-37.9702777', '-57.5955626', '225', 9, 2, 6, 'Check-out: 10:00. No está permitido hacer fiestas ni eventos.', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(5, 'Glamping Estilo Florida', 'Dispuestas sobre una plataforma, están completamente amobladas, ofrecen camas reales con lencería de alta calidad, aire acondicionado y calefacción para mantener su carpa a la temperatura perfecta, además de baño privado.', '', 1, 'Mendoza 123', '-37.9702777', '-57.5955626', '100', 7, 3, 5, 'Check-out: 10:00. No se permiten fiestas. No se permite fumar', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(6, 'Glamping Hermitage', 'Dispuestas sobre una plataforma, están completamente amobladas, ofrecen camas reales con lencería de alta calidad, aire acondicionado y calefacción para mantener su carpa a la temperatura perfecta, además de baño privado.', '', 1, 'Bogotá 123', '-37.9702777', '-57.5955626', '125', 7, 3, 7, 'Check-out: 10:00. No se permiten fiestas', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(7, 'Apartamento en Bs. As.', 'Amplio apartamento con excelente cocina amoblada. Pisos de madera. Ubicado en excelente zona con grandes espacios verdes..', '', 1, 'Bs As 123', '-37.9702777', '-57.5955626', '225', 10, 4, 1, 'Check-out: 10:00. No se permiten fiestas. No se permite fumar', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(8, 'Apartamento en La Plata', 'A estrenar. Amplio apartamento 2 ambientes. Cuenta con alarma y excelente sistema de ventilación. Compuesto pon un dormitorio con placard. Excelente terminación con una construcción moderna y sólida.', '', 1, 'Calle 7 y 54', '-37.9702777', '-57.5955626', '175', 4, 4, 2, 'Check-out: 10:00. No se permiten fiestas', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(9, 'Casa campestre Córdoba', 'Maravillosa casa campestre en Córdoba.', '', 1, 'Cordoba campestre', '-37.9702777', '-57.5955626', '300', 8, 5, 4, 'Check-out: 10:00. No se permiten fiestas', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.'),
(10, 'Casa campestre Mendoza', 'Maravillosa casa campestre en Mendoza.', '', 1, 'Mendoza campestre', '-37.9702777', '-57.5955626', '230', 5, 5, 5, 'Check-out: 10:00. No se permiten fiestas. No se permite fumar', 'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus. Detector de humo. Depósito de seguridad', 'Agregá las fechas de tu viaje para obtener los detallles decancelación de esta estadía.');

--
-- Volcado de datos para la tabla `product_spec`
--

INSERT INTO `product_spec` (`id_product`, `id_spec`) VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(1, 7),
(1, 8),
(2, 1),
(2, 2),
(2, 5),
(3, 4),
(3, 5),
(3, 7),
(4, 4),
(5, 7),
(6, 1),
(6, 5),
(6, 7),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(8, 1),
(8, 3),
(8, 5),
(9, 4),
(9, 5),
(9, 7),
(10, 4),
(10, 5);

--
-- Volcado de datos para la tabla `reservation`
--

INSERT INTO `reservation` (`id`, `arrival_time`, `check_in_date`, `checkout_date`, `comments`, `user_id`, `product_id`) VALUES
(1, '10:30:00', '2022-11-24', '2022-12-08', 'Llevo mi mascota', 6, 4),
(2, '11:00:00', '2023-01-01', '2023-01-05', 'Puedo demorarme 30 minutos', 6, 4),
(3, '10:30:00', '2022-12-16', '2022-12-26', 'Llevo mi mascota', 1, 1),
(4, '10:30:00', '2022-12-23', '2023-01-08', 'Llevo mi mascota', 2, 2);

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'USER'),
(2, 'ADMIN');

--
-- Volcado de datos para la tabla `spec`
--

INSERT INTO `spec` (`id`, `name`, `icon`) VALUES
(1, 'Wifi', 'faWifi'),
(2, 'Estacionamiento gratuito', 'faCar'),
(3, 'Aire Acondicionado', 'faSnowflake'),
(4, 'Apto Mascotas', 'faPaw'),
(5, 'Televisor', 'faTv'),
(6, 'Pileta', 'faSwimmer'),
(7, 'Prohibido fumar', 'faBanSmoking'),
(8, 'Cocina', 'faFireBurner');

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `enabled`, `city_id`, `role_id`) VALUES
(1, 'Ignacio', 'Justel', 'nacho@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 1, 2),
(2, 'Virginia', 'Iojino', 'vir@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 1, 2),
(3, 'Martha', 'de la Ossa', 'martha@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 11, 2),
(4, 'Cristian', 'Diaz', 'cris@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 7, 2),
(5, 'Henry', 'Gutierrez', 'henry@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 8, 2),
(6, 'Giovanny', 'Cardenas', 'gio@dh.com', '$2a$10$izo/rgH5EsHpxc43gOfXWeJThcD6mGnt88jm/LijDRdJGMay4x4Ba', 1, 7, 2),
(10, 'luis', 'Villalobos', 'luijo.villalobos@gmail.com', '$2a$10$.xT1lpoS91RXcNNqbnoV/OQAUpnLaN.eKm7iAJm8DPQcM2XVmT/hS', 1, 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
