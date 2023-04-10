interface IsbSector {
    id?: string;
    name: string;
    idAdvised?: string;
  }
  interface IAdvEntities {
    id?: string;
    name: string;
    sbSector?: IsbSector[];
  }
export let advEntities: IAdvEntities[] = [
    {
        name: 'Gobierno General',
        sbSector: []
    },
    {
        name: 'Gobierno Central',
        sbSector: []
    },
    {
        name: 'Administración Central',
        sbSector: []
    },
    {
        name: 'Organismo Legislativo',
        sbSector: [

            {
                name: 'Congreso de la República de Guatemala',
            },
        ]
    },
    {
        name: 'Organismo Judicial',
        sbSector: [
            {
                name: 'Organismo Judicial',
            },
        ]
    },
    {
        name: 'Presidencia,  Ministerios  de  Estado,  Secretarías  y Otras Dependencias del Ejecutivo',
        sbSector: [
            {
                name: 'Presidencia de la República',
            },
            {
                name: 'Ministerio de Relaciones Exteriores',
            },
            {
                name: 'Ministerio de Gobernación',
            },
            {
                name: 'Ministerio de la Defensa Nacional',
            },
            {
                name: 'Ministerio de Finanzas Públicas',
            },
            {
                name: 'Ministerio de Educación',
            },
            {
                name: 'Ministerio de Salud Pública y Asistencia Social',
            },
            {
                name: 'Ministerio de Trabajo y Previsión Social',
            },
            {
                name: 'Ministerio de Economía',
            },
            {
                name: 'Ministerio de Agricultura, Ganadería y Alimentación',
            },
            {
                name: 'Ministerio de Comunicaciones, Infraestructura y Vivienda',
            },
            {
                name: 'Ministerio de Energía y Minas',
            },
            {
                name: 'Ministerio de Cultura y Deportes',
            },
            {
                name: 'Ministerio de Ambiente y Recursos Naturales',
            },
            {
                name: 'Ministerio de Desarrollo Social',
            },
        ]
    },

    {
        name: 'Secretarías y Otras Dependencias del Ejecutivo',
        sbSector: [
            {
                name: 'Secretaría General de la Presidencia de la República (SGP)',
            },
            {
                name: 'Comisión Presidencial Coordinadora de la Política del Ejecutivo en Materia de Derechos Humanos (Copredeh)',
            },
            {
                name: 'Secretaría Privada de la Presidencia (SPP)',
            },
            {
                name: 'Secretaría de Coordinación Ejecutiva de la Presidencia (SCEP)',
            },
            {
                name: 'Fondo de Desarrollo Indígena Guatemalteco (FODIGUA)',
            },
            {
                name: 'Secretaría de Comunicación Social de la Presidencia de la República (SCSPR)',
            },
            {
                name: 'Secretaría de Bienestar Social de la Presidencia de la República (SBS)',
            },
            {
                name: 'Secretaría de la Paz (SEPAZ)',
            },
            {
                name: 'Oficina Nacional de Servicio Civil (ONSEC)',
            },
            {
                name: 'Consejo Nacional de Áreas Protegidas (CONAP)',
            },
            {
                name: 'Autoridad para el Manejo Sustentable de la Cuenca y del Lago de Amatitlán (AMSA)',
            },
            {
                name: 'Secretaría de Planificación y Programación de la Presidencia (Segeplán)',
            },
            {
                name: 'Consejo Nacional de la Juventud (Conjuve)',
            },
            {
                name: 'Secretaría Ejecutiva Comisión Contra las Adicciones y el Tráfico Ilícito de Drogas (SECCATID)',
            },
            {
                name: 'Secretaría Nacional de Ciencia y Tecnología (SENACYT)',
            },
            {
                name: 'Secretaría de Obras Sociales de la Esposa del Presidente (SOSEP)',
            },
            {
                name: 'Secretaría Presidencial de la Mujer (Seprem)',
            },
            {
                name: 'Secretaría de Asuntos Agrarios de la Presidencia de la República (SAA)',
            },
            {
                name: 'Comisión Presidencial Contra la Discriminación y el Racismo Contra los Pueblos Indígenas (CODISRA)',
            },
            {
                name: 'Secretaría de Seguridad Alimentaria y Nutricional de la Presidencia de la República (SESAN)',
            },
            {
                name: 'Autoridad para el Manejo Sustentable de la Cuenca del Lago de Atitlán y su Entorno (AMSCLAE)',
            },
            {
                name: 'Defensoría de la Mujer Indígena (DEMI)',
            },
            {
                name: 'Secretaria de Inteligencia Estratégica del Estado (SIE)',
            },
            {
                name: 'Secretaría Técnica del Consejo Nacional de Seguridad (STCNS)',
            },
            {
                name: 'Secretaria Contra la Violencia Sexual, Explotación y Trata de Personas (SVET)',
            },
        ]
    },

    {
        name: 'Órganos de Control Jurídico-Administrativo',
        sbSector: [
            {
                name: 'Contraloría General de Cuentas (CGC)',
            },
            {
                name: 'Procuraduría General de la Nación (PGN)',
            },
            {
                name: 'Ministerio Público (MP)',
            },
            {
                name: 'Corte de Constitucionalidad (CC)',
            },
            {
                name: 'Registro General de la Propiedad (RGP)',
            },
            {
                name: 'Instituto de la Defensa Pública Penal (IDPP)',
            },
            {
                name: 'Segundo Registro de la Propiedad',
            },
            {
                name: 'Coordinadora Nacional para la Reducción de Desastres de Origen Natural o Provocado  (Conred)',
            },
            {
                name: 'Registro de Información Catastral de Guatemala (RIC)',
            },
            {
                name: 'Registro Nacional de las Personas (Renap)',
            },
            {
                name: 'Consejo Nacional de Adopciones (CNA)',
            },
            {
                name: 'Consejo Nacional de Atención al Migrante de Guatemala (Conamigua)',
            },
            {
                name: 'Secretaría Ejecutiva de la Instancia Coordinadora de la Modernización del Sector Justicia (SEICMJ)',
            },
            {
                name: 'Secretaría Nacional de Administración de Bienes en Extinción de Dominio (Senabed)',
            },
            {
                name: 'Consejo Nacional del Deporte, la Educación Física y la Recreación (Conader)',
            },
            {
                name: 'Consejo Económico y Social de Guatemala (CES)',
            },
            {
                name: 'Comisión Nacional de Energía Eléctrica',
            },
            {
                name: 'Oficina Nacional de Prevención de la Tortura y Otros Tratos o Penas Crueles, Inhumanos o Degradantes',
            },
        ]
    },
    {
        name: 'Órganos de Control Político',
        sbSector: [
            {
                name: 'Tribunal Supremo Electoral (TSE)',
            },
            {
                name: 'Procuraduría de los Derechos Humanos (PDH)',
            },
        ]
    },
    {
        name: 'Entidades Descentralizadas no Empresariales',
        sbSector: [
            {
                name: 'Instituto Nacional de Estadística (INE)',
            },
            {
                name: 'Instituto Nacional de Administración Pública (INAP)',
            },
            {
                name: 'Instituto Técnico de Capacitación y Productividad (Intecap)',
            },
            {
                name: 'Instituto de Recreación de los Trabajadores de la Empresa Privada de Guatemala (Irtra)',
            },
            {
                name: 'Consejo Nacional para la Protección de la Antigua Guatemala (CNPAG)',
            },
            {
                name: 'Benemérito Cuerpo Voluntario de Bomberos de Guatemala (CVB)',
            },
            {
                name: 'Aporte para la Descentralización Cultural (Adesca)',
            },
            {
                name: 'Instituto de Ciencia y Tecnología Agrícolas (ICTA)',
            },
            {
                name: 'Instituto Nacional de Ciencias Forenses de Guatemala (Inacif)',
            },
            {
                name: 'Comité Permanente de Exposiciones (Coperex)',
            },
            {
                name: 'Instituto Nacional de Cooperativas (Inacop)',
            },
            {
                name: 'Inspección General de Cooperativas (Ingecop)',
            },
            {
                name: 'Instituto Guatemalteco de Turismo (Inguat)',
            },
            {
                name: 'Instituto de Fomento Municipal  (Infom)',
            },
            {
                name: 'Instituto Nacional de Bosques (Inab)',
            },
            {
                name: 'Superintendencia de Administración Tributaria (SAT)',
            },
            {
                name: 'Fondo de Tierras (Fontierras)',
            },
            {
                name: 'Comité Nacional de Alfabetización (Conalfa)',
            },
            {
                name: 'Academia de las Lenguas Mayas de Guatemala (ALMG)',
            },
            {
                name: 'Consejo Nacional para la Atención de las Personas con Discapacidad (Conadi)',
            },
            {
                name: 'Agencia Nacional de Alianzas para el Desarrollo de Infraestructura Económica (Anadie)',
            },
        ]
    },
    {
        name: 'Entidades Autónomas no Empresariales',
        sbSector: [
            {
                name: 'Universidad de San Carlos de Guatemala (USAC)',
            },
            {
                name: 'Confederación Deportiva Autónoma de Guatemala (CDAG)',
            },
            {
                name: 'Comité Olímpico Guatemalteco (COG)',
            },
            {
                name: 'Escuela Nacional Central de Agricultura (ENCA)',
            },
            {
                name: 'Federación Nacional de Triatlón',
            },
            {
                name: 'Federación Nacional de Boliche',
            },
            {
                name: 'Federación Nacional de Voleibol',
            },
            {
                name: 'Federación Nacional de Natación, Clavados, Polo Acuático y Nado Sincronizado',
            },
            {
                name: 'Federación Nacional de Fútbol',
            },
            {
                name: 'Federación Nacional de Luchas de Guatemala',
            },
            {
                name: 'Federación Nacional de Ciclismo de Guatemala',
            },
            {
                name: 'Federación Nacional de Tenis de Campo',
            },
            {
                name: 'Federación Nacional de Boxeo',
            },
            {
                name: 'Federación Nacional de Tiro',
            },
            {
                name: 'Federación Nacional de Bádminton de Guatemala',
            },
            {
                name: 'Federación Nacional de Esgrima',
            },
            {
                name: 'Federación Nacional de Balonmano',
            },
            {
                name: 'Federación Nacional de Levantamiento de Pesas',
            },
            {
                name: 'Federación Nacional de Ajedrez de Guatemala',
            },
            {
                name: 'Federación Nacional de Beisbol',
            },
            {
                name: 'Federación Nacional de Remo y Canotaje',
            },
            {
                name: 'Federación Nacional de Motociclismo',
            },
            {
                name: 'Tribunal Electoccionario del Deporte Federado',
            },
            {
                name: 'Federación Nacional de Andinismo',
            },
            {
                name: 'Federación Nacional de Baloncesto',
            },
            {
                name: 'Federación Nacional de Atletismo',
            },
            {
                name: 'Federación Nacional de Gimnasia',
            },
            {
                name: 'Federación Nacional de Físico Culturismo',
            },
            {
                name: 'Federación Nacional de Patinaje de Guatemala',
            },
            {
                name: 'Federación Nacional de Karate-Do',
            },
            {
                name: 'Federación Nacional de Levantamiento de Potencia',
            },
            {
                name: 'Federación Nacional de Tenis de Mesa',
            },
            {
                name: 'Federación Nacional de Taekwon-Do',
            },
            {
                name: 'Federación Nacional de Judo',
            },
        ]
    },
    {
        name: 'Entidades de Seguridad Social',
        sbSector: [
            {
                name: 'Instituto Guatemalteco de Seguridad Social (IGSS)',
            },
            {
                name: 'Instituto de Previsión Militar (IPM)',
            },
        ]
    },
    {
        name: 'Gobiernos Locales',
        sbSector: []
    },
    {
        name: 'Municipalidades',
        sbSector: []
    },
    {
        name: 'Entidades Públicas Municipales no Empresariales',
        sbSector: [
            {
                name: 'Entidad Metropolitana Reguladora de Transporte y Tránsito del Municipio de Guatemala y sus Áreas de Influencia Urbana',
            },
            {
                name: 'Oficina Asesora de Recursos Humanos de las Municipalidades (OARHM)',
            },
        ]
    },
    {
        name: 'Entidades Públicas Municipales de Seguridad Social',
        sbSector: [
            {
                name: 'Plan de Prestaciones del Empleado Municipal (PPEM)',
            },
        ]
    },
    {
        name: 'Mancomunidades de Municipalidades',
        sbSector: [
            {
                name: 'Mancomunidad de Municipios de Desarrollo Integral de la Cuenca Copan Ch’orti’',
            },
            {
                name: 'Mancomunidad  Encuentro  Regional  Ixil  por  la  Paz (Eripaz)',
            },
            {
                name: 'Mancomunidad Laguna Güija',
            },
            {
                name: 'Mancomunidad de Nor-Oriente',
            },
            {
                name: 'Mancomunidad de  Municipalidades de  la Cuenca del Río El Naranjo (Mancuerna)',
            },
            {
                name: 'Mancomunidad de Municipios Metrópoli de los Altos',
            },
            {
                name: 'Mancomunidad Frontera del Norte',
            },
            {
                name: 'Asociación de Municipios en el Corazón de la Zona Paz (Municopaz)',
            },
            {
                name: 'Asociación Nacional de Municipalidades (Anam)',
            },
            {
                name: 'Mancomunidad de Municipios para el Desarrollo Integral del Área Poqomchí (Manpoqomchi)',
            },
            {
                name: 'Mancomunidad Área Mam de Quetzaltenango (Mamq)',
            },
            {
                name: 'Mancomunidad de Municipios de la Franja Transversal del Norte',
            },
            {
                name: 'Mancomunidad Trinacional Fronteriza Río Lempa',
            },
            {
                name: 'Mancomunidad del Cono Sur, Jutiapa',
            },
            {
                name: 'Mancomunidad Montaña El Gigante',
            },
            {
                name: 'Mancomunidad  de  Municipios  del  Sur  Occidente  de Huehuetenango',
            },
            {
                name: 'Mancomunidad  de  Municipios  Kakchiquel,  Chichoy  y Atitlán (Mankatitlán)',
            },
            {
                name: 'Mancomunidad Tzolojya',
            },
            {
                name: 'Mancomunidad Huista',
            },
            {
                name: 'Mancomunidad del Sur Oriente',
            },
            {
                name: 'Asociación de Desarrollo Integral de Municipalidades del Altiplano Marquense (ADIMAM)',
            },
            {
                name: 'Mancomunidad Gran Ciudad del Sur del Departamento de Guatemala',
            },
            {
                name: 'Mancomunidad Jalapa Unida por la Seguridad Alimentaria y Nutricional',
            },
            {
                name: 'Mancomunidad de Municipios para el Desarrollo Local Sostenible el Pacifico',
            },
            {
                name: 'Mancomunidad de Municipios del Corredor Seco del Departamento de Quiché',
            },
        ]
    },
    {
        name: 'Empresas Públicas',
        sbSector: []
    },
    {
        name: 'Empresas Públicas no Financieras',
        sbSector: []
    },
    {
        name: 'Empresas Públicas no Financieras Nacionales',
        sbSector: [
            {
                name: 'Empresa Guatemalteca de Telecomunicaciones (Guatel)',
            },
            {
                name: 'Zona Libre de Industria y Comercio Santo Tomás de Castilla (Zolic)',
            },
            {
                name: 'Empresa Portuaria Nacional Santo Tomás de Castilla (Empornac)',
            },
            {
                name: 'Empresa Portuaria Quetzal  (EPQ)',
            },
            {
                name: 'Empresa Portuaria Nacional de Champerico (EPNCH)',
            },
            {
                name: 'Empresa Ferrocarriles de Guatemala (Fegua)',
            },
            {
                name: 'Instituto Nacional de Comercialización Agrícola (Indeca)',
            },
            {
                name: 'Instituto Nacional de Electrificación (INDE)',
            },
        ]
    },
    {
        name: 'Empresas Públicas no Financieras Municipales',
        sbSector: [
            {
                name: 'Empresa Municipal de Agua (Empagua)',
            },
            {
                name: 'Empresa Eléctrica Municipal de Huehuetenango',
            },
            {
                name: 'Empresa Eléctrica Municipal de Jalapa',
            },
            {
                name: 'Empresa Eléctrica Municipal de San Pedro Pinula',
            },
            {
                name: 'Empresa Eléctrica Municipal de Zacapa',
            },
            {
                name: 'Empresa Hidroeléctrica Municipal de El Progreso',
            },
            {
                name: 'Empresa Hidroeléctrica Municipal de Retalhuleu',
            },
            {
                name: 'Empresa Municipal de Transporte de la Ciudad de Guatemala',
            },
            {
                name: 'Empresa Municipal Rural de Electricidad Ixcán (EMRE)',
            },
            {
                name: 'Empresa Municipal de Agua Potable y Alcantarillado (Emapet), Flores-San Benito, Petén',
            },
            {
                name: 'Empresa Eléctrica de Gualán',
            },
            {
                name: 'Empresa Eléctrica Municipal de Puerto Barrios',
            },
            {
                name: 'Empresa Metropolitana de Vivienda y Desarrollo Urbano',
            },
            {
                name: 'Empresa Pública Municipal Agroindustrial de Estanzuela, Departamento de Zacapa',
            },
            {
                name: 'Empresa Municipal de Agua Jalapagua',
            },
            {
                name: 'Empresa Municipal de Manejo Integral de Residuos Sólidos de Jalapa Departamento de Jalapa',
            },
        ]
    },
    {
        name: 'Empresas Públicas Financieras',
        sbSector: []
    },
    {
        name: 'Empresas Públicas Financieras no Monetarias Nacionales',
        sbSector: [
            {
                name: 'Instituto de Fomento de Hipotecas Aseguradas (FHA)',
            },
            {
                name: 'Corporación Financiera Nacional (Corfina)',
            },
        ]
    },
    {
        name: 'Empresas Públicas Financieras Monetarias Nacionales',
        sbSector: [
            {
                name: 'Superintendencia de Bancos (SIB)',
            },
            {
                name: 'El Crédito Hipotecario Nacional de Guatemala  (CHN)',
            },
            {
                name: 'Banco de Guatemala (Banguat)',
            },
        ]
    },
    {
        name: 'Sistema de Consejos de Desarrollo',
        sbSector: []
    },
    {
        name: 'Nivel Nacional',
        sbSector: [
            {
                name: 'Consejo de Nacional de Desarrollo Urbano y Rural',
            },
        ]
    },
    {
        name: 'Nivel Regional',
        sbSector: [
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -1',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -2',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -3',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -4',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -5',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -6',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -7',
            },
            {
                name: 'Consejo de Regional de Desarrollo Urbano y Rural -8',
            },
        ]
    },
    {
        name: 'Nivel Departamental',
        sbSector: [
            {
                name: 'Consejo de Departamental de Desarrollo - 1',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 2',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 3',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 4',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 5',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 6',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 7',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 8',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 9',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 10',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 11',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 12',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 13',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 14',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 15',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 16',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 17',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 18',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 19',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 20',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 21',
            },
            {
                name: 'Consejo de Departamental de Desarrollo - 22',
            },
        ]
    },
]