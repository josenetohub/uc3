// ==========================================================================
// BANCO DE DADOS DE VOCABULÁRIO FÍSICO & LETRAMENTO CIENTÍFICO ESCOLAR
// Conceitos explicados em linguagem simples, cotidiana e sem jargões complexos,
// com exemplos práticos do jogo e desmistificação de crenças populares.
// ==========================================================================

const VOCABULARIO_FISICO = [
    // -------------------------------------------------------------
    // 1º ANO: MECÂNICA, MOVIMENTO, TRÂNSITO & SEGURANÇA
    // -------------------------------------------------------------
    {
        id: "atrito",
        termo: "Atrito",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🛞",
        definicaoSimples: "É a força de resistência que aparece quando duas superfícies se esfregam. Sem o atrito, o pneu do carro apenas giraria em falso sem sair do lugar e nós nunca conseguiríamos andar sem escorregar!",
        exemploCotidiano: "O contato da borracha do pneu com o asfalto áspero. Quando pisamos no freio, é o atrito que segura o carro.",
        mitoComum: "Achar que o atrito só serve para estragar as coisas. Fato: Sem atrito, ninguém conseguiria andar, correr ou frear um veículo!",
        tags: ["atrito", "pneu", "chão", "freio", "escorregar", "força", "mecânica"]
    },
    {
        id: "aderencia",
        termo: "Aderência",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🛑",
        definicaoSimples: "É a capacidade de uma superfície 'grudar' na outra sem derrapar. Quanto maior for a aderência do pneu com a pista, mais seguro é fazer curvas, acelerar e frear.",
        exemploCotidiano: "Pneus novos com ranhuras fundas garantem alta aderência no asfalto. Já pneus carecas perdem o contato e deslizam como sabão.",
        mitoComum: "Achar que acelerar fundo na pista molhada aumenta a aderência. Fato: Acelerar forte no piso molhado faz o pneu girar em falso e perder o controle.",
        tags: ["aderência", "grudar", "pneu", "curva", "segurança", "pista"]
    },
    {
        id: "colisao",
        termo: "Colisão (Impacto)",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "💥",
        definicaoSimples: "É o choque ou batida violenta entre dois ou mais corpos. Durante uma colisão, as velocidades mudam em frações de segundo e uma quantidade brutal de energia é transferida.",
        exemploCotidiano: "Um carro batendo em uma barreira ou na traseira de outro veículo. O impacto dura centésimos de segundo.",
        mitoComum: "Achar que um carro antigo de ferro duro era melhor porque batia e não amassava. Fato: Se o carro não amassa, toda a energia da batida é jogada no corpo do motorista!",
        tags: ["colisão", "impacto", "batida", "energia", "acidente", "força"]
    },
    {
        id: "empuxo",
        termo: "Empuxo (e Aquaplanagem)",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🌊",
        definicaoSimples: "É a força exercida para cima por qualquer fluido (líquido ou gás) quando algo tenta entrar nele. É o empuxo da água que faz os navios flutuarem e o empuxo do ar que faz os balões subirem.",
        exemploCotidiano: "Na rodovia sob chuva, a poça d'água exerce uma força para cima (empuxo e pressão hidrodinâmica) que levanta o pneu do carro! O veículo começa a 'surfar' sobre a água sem tocar o asfalto (aquaplanagem).",
        mitoComum: "Achar que o carro afunda na poça ao aquaplanar. Fato: O carro é levantado pela água e perde 100% do contato com o chão!",
        tags: ["empuxo", "aquaplanagem", "água", "flutuar", "chuva", "pneu"]
    },
    {
        id: "inercia",
        termo: "Inércia (1ª Lei de Newton)",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🚗",
        definicaoSimples: "É a tendência natural de todo corpo: quem está parado quer continuar parado, e quem está em movimento quer continuar correndo na mesma velocidade e direção até que uma força o segure!",
        exemploCotidiano: "Quando o ônibus freia no ponto e os passageiros são jogados para a frente. O corpo deles não freou junto com o ônibus: queria continuar na velocidade antiga!",
        mitoComum: "Achar que existe uma força invisível empurrando a pessoa para a frente na freada. Fato: Não há força empurrando; o corpo apenas continuava na velocidade que já tinha.",
        tags: ["inércia", "newton", "movimento", "cinto", "ônibus", "freio"]
    },
    {
        id: "atrito_abs",
        termo: "Atrito Estático vs Cinético (Freio ABS)",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "⚡",
        definicaoSimples: "Atrito estático é quando o pneu rola no chão sem escorregar (segura com força total). Atrito cinético é quando o pneu trava e desliza derrapando (segura muito menos e perde a direção!).",
        exemploCotidiano: "O sistema de freio ABS solta e aperta o freio 20 vezes por segundo para nunca deixar a roda travar, mantendo o atrito estático e permitindo virar o volante para desviar do perigo.",
        mitoComum: "Pisar com tudo no freio até a roda travar e cantar pneu é o jeito mais rápido de parar. Fato: Roda travada derrapa, demora mais para parar e o volante não responde!",
        tags: ["abs", "atrito estático", "atrito cinético", "derrapagem", "volante", "direção"]
    },
    {
        id: "desaceleracao",
        termo: "Desaceleração",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "📉",
        definicaoSimples: "É a diminuição da velocidade de um corpo ao longo do tempo. É a aceleração no sentido contrário ao movimento, fazendo o veículo frear.",
        exemploCotidiano: "O carro passando de 80 km/h para 0 km/h na freada. Quanto mais rápida for a parada, maior é a sensação de 'puxão' no cinto de segurança.",
        mitoComum: "Achar que desacelerar em 1 segundo e desacelerar em 5 segundos dá na mesma. Fato: Parar em menos tempo multiplica a força brutal que age sobre o corpo!",
        tags: ["desaceleração", "velocidade", "tempo", "freio", "parada"]
    },
    {
        id: "tempo_reacao",
        termo: "Tempo de Reação",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "⏱️",
        definicaoSimples: "É o tempo que o cérebro leva desde enxergar um perigo na pista até mandar o comando para a perna e o pé finalmente pisar no pedal do freio (cerca de 1 segundo em média).",
        exemploCotidiano: "A 72 km/h, o carro anda 20 metros a cada segundo. Se o motorista demorar 1 segundo para reagir, o carro andou 20 metros antes mesmo de o freio começar a agir!",
        mitoComum: "'Eu tenho reflexos rápidos de videogame e piso no freio na mesma hora'. Fato: Biologicamente, todo ser humano leva de 0,7 a 1,5 segundo para reagir a um imprevisto.",
        tags: ["tempo de reação", "reflexo", "olhos", "cérebro", "distância", "perigo"]
    },
    {
        id: "deformacao_programada",
        termo: "Zonas de Deformação Programada",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🛡️",
        definicaoSimples: "É a tecnologia moderna da frente e da traseira do carro feita para amassar como sanfona durante uma batida. Ao amassar, a lata engole a energia e estica o tempo da pancada, salvando a vida de quem está dentro.",
        exemploCotidiano: "Carros modernos envolvidos em batidas ficam com a frente destruída, mas a cabine dos passageiros fica 100% intacta e as pessoas saem andando.",
        mitoComum: "Dizer que carro novo é 'frágil' porque amassa fácil. Fato: Ele amassa de propósito para você não quebrar os ossos nem os órgãos internos!",
        tags: ["deformação", "sanfona", "impacto", "segurança", "cabine", "lataria"]
    },
    {
        id: "forca_impacto",
        termo: "Força de Impacto (Impulso & Tempo)",
        categoria: "ano1",
        turmaNome: "1º Ano • Mecânica e Trânsito",
        icone: "🎈",
        definicaoSimples: "É a intensidade da pancada transmitida ao corpo na colisão. A física mostra uma regra básica: aumentar o tempo de parada divide a força do impacto na mesma proporção!",
        exemploCotidiano: "O airbag estica o tempo da batida de 0,02 segundo para 0,20 segundo (10 vezes mais tempo!). Com isso, a força no peito fica 10 vezes menor.",
        mitoComum: "Achar que o airbag serve só para ser macio como travesseiro. Fato: Sua verdadeira função física é esticar o tempo de parada para diminuir a força da pancada.",
        tags: ["airbag", "tempo", "força", "impacto", "impulso", "amortecer"]
    },

    // -------------------------------------------------------------
    // 2º ANO: TERMOLOGIA, CALOR, BIOMAS & HABITAÇÕES
    // -------------------------------------------------------------
    {
        id: "calor",
        termo: "Calor",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🔥",
        definicaoSimples: "É a energia térmica que viaja espontaneamente de onde está mais quente para onde está mais frio. O calor nunca fica parado!",
        exemploCotidiano: "O calor do Sol viajando pelo ar e esquentando as telhas da casa, ou o calor da sopa passando para a colher de metal.",
        mitoComum: "Dizer 'estou com muito calor'. Fato: Na física, corpos têm energia térmica e temperatura; calor é apenas a energia quando está passando de um corpo para outro!",
        tags: ["calor", "energia", "térmico", "temperatura", "quente", "frio"]
    },
    {
        id: "temperatura",
        termo: "Temperatura",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🌡️",
        definicaoSimples: "É a medida da agitação média das moléculas de um corpo. Quanto mais rápido as partículas estiverem vibrando, mais alta é a temperatura marcada no termômetro.",
        exemploCotidiano: "Medir 38°C no asfalto quente da cidade ao meio-dia vs 24°C dentro de uma casa com telhado branco reflexivo.",
        mitoComum: "Confundir calor com temperatura. Fato: Temperatura mede o quanto as moléculas estão agitadas (°C); calor é a energia em viagem (Joules ou calorias).",
        tags: ["temperatura", "termômetro", "moléculas", "graus", "agitação"]
    },
    {
        id: "conducao",
        termo: "Condução Térmica",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🥄",
        definicaoSimples: "É o jeito que o calor viaja através dos materiais sólidos, passando de átomo em átomo vizinho através de pequenas vibrações em contato direto.",
        exemploCotidiano: "A colher de metal que queima a ponta dos dedos quando é deixada encostada no fundo da panela de comida quente.",
        mitoComum: "Achar que o calor viaja voando por dentro da colher. Fato: O calor passa de partícula em partícula sólida através do contato direto.",
        tags: ["condução", "sólido", "colher", "metal", "contato", "calor"]
    },
    {
        id: "conveccao",
        termo: "Convecção Térmica",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "💨",
        definicaoSimples: "É o transporte de calor que acontece em líquidos e gases através de correntes de circulação: o ar ou líquido aquecido se expande, fica mais leve e SOBE; o ar frio, mais pesado, DESCE.",
        exemploCotidiano: "O ar quente subindo para o teto da casa, ou a água fervendo na chaleira fazendo círculos de baixo para cima.",
        mitoComum: "Achar que o ar frio sobe. Fato: É sempre o ar quente que fica menos denso (mais leve) e sobe naturalmente!",
        tags: ["convecção", "ar quente", "subir", "fresco", "corrente", "fluido"]
    },
    {
        id: "radiacao",
        termo: "Radiação Térmica (Irradiação)",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "☀️",
        definicaoSimples: "É o calor que viaja na forma de ondas invisíveis (raios infravermelhos). É o único modo de transferência de calor que não precisa de matéria e viaja até no espaço vazio!",
        exemploCotidiano: "Sentir o calor gostoso da fogueira à distância, ou o calor do Sol que viaja milhões de quilômetros pelo vácuo do espaço até a Terra.",
        mitoComum: "Achar que o calor do Sol vem pelo vento. Fato: No espaço sideral não há ar nem vento; o calor chega em ondas de luz invisível (radiação).",
        tags: ["radiação", "irradiação", "sol", "espaço", "infravermelho", "ondas"]
    },
    {
        id: "albedo",
        termo: "Albedo (Poder de Reflexão)",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🎨",
        definicaoSimples: "É a capacidade de uma cor ou superfície clara de refletir a luz solar de volta como um espelho, em vez de engolir a energia e esquentar.",
        exemploCotidiano: "Um telhado pintado de branco tem alto albedo (reflete 85% do sol e mantém o quarto fresco). Já o asfalto preto tem baixo albedo (absorve o sol e vira um forno).",
        mitoComum: "Achar que pintar a parede de branco é apenas escolha de beleza. Fato: Cores claras refletem o calor e diminuem o uso de ar-condicionado em até 80%!",
        tags: ["albedo", "cores", "branco", "preto", "reflexão", "telhado", "sol"]
    },
    {
        id: "isolante_termico",
        termo: "Isolante Térmico",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "📦",
        definicaoSimples: "É qualquer material que barra ou atrasa muito a passagem do calor, mantendo o ambiente ou o corpo protegido das mudanças térmicas.",
        exemploCotidiano: "Placas de isopor, cobertores de lã e as caixas de leite Tetra Pak instaladas sob as telhas para rebater o bafo quente do telhado.",
        mitoComum: "Dizer que 'o cobertor esquenta a gente'. Fato: O cobertor não produz calor nenhum! Ele apenas isola o calor produzido pelo seu próprio corpo para não escapar para o quarto frio.",
        tags: ["isolante", "isopor", "tetra pak", "cobertor", "barreira", "temperatura"]
    },
    {
        id: "condutor_termico",
        termo: "Condutor Térmico",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🍳",
        definicaoSimples: "É qualquer material que deixa o calor passar com facilidade e grande velocidade através da sua estrutura.",
        exemploCotidiano: "Metais como alumínio, ferro e cobre. Panelas são feitas de metal justamente para o calor do fogão passar rápido para a comida.",
        mitoComum: "Achar que a maçaneta de ferro da porta está mais fria do que a madeira. Fato: Ambas estão na mesma temperatura da sala! O metal só 'rouba' o calor da sua mão muito mais rápido.",
        tags: ["condutor", "metal", "alumínio", "ferro", "passagem", "calor"]
    },
    {
        id: "efeito_chamine",
        termo: "Efeito Chaminé (Lanternim)",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🏠",
        definicaoSimples: "Técnica da física onde o ar quente que sobe para o teto escapa por uma abertura no alto (o lanternim), criando uma sucção natural que puxa vento fresco pelas janelas de baixo sem gastar energia.",
        exemploCotidiano: "Galpões sustentáveis e casas ecológicas no semiárido e cerrado que dispensam ar-condicionado aproveitando a convecção do telhado.",
        mitoComum: "Achar que para a casa ficar fresca é obrigatório gastar luz com ventiladores potentes. Fato: Com abertura no cume do telhado, a física faz a circulação acontecer de graça!",
        tags: ["efeito chaminé", "lanternim", "ventilação", "convecção", "telhado", "casa"]
    },
    {
        id: "ilha_calor",
        termo: "Ilha de Calor Urbana",
        categoria: "ano2",
        turmaNome: "2º Ano • Termologia e Casas",
        icone: "🏙️",
        definicaoSimples: "É o aquecimento excessivo dos centros das cidades comparados às áreas arborizadas vizinhas, provocado por muito asfalto escuro, prédios de concreto e falta de árvores.",
        exemploCotidiano: "A sensação sufocante de calor ao caminhar em uma avenida de asfalto preto às 18h: o asfalto absorveu calor o dia inteiro e solta o mormaço quente à noite.",
        mitoComum: "Achar que as cidades esquentam apenas por causa dos motores dos carros. Fato: O maior vilão térmico é o asfalto e as lajes escuras absorvendo sol direto.",
        tags: ["ilha de calor", "cidade", "asfalto", "árvores", "concreto", "urbano"]
    },

    // -------------------------------------------------------------
    // 3º ANO: ONDAS, ELETROMAGNETISMO, SOM & TELECOMUNICAÇÕES
    // -------------------------------------------------------------
    {
        id: "onda_mecanica",
        termo: "Onda Mecânica",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "🔊",
        definicaoSimples: "É uma onda que PRECISA obrigatoriamente de matéria (ar, água ou sólidos) para conseguir viajar. Ela não consegue se propagar no vácuo do espaço!",
        exemploCotidiano: "O som da nossa voz, o batuque de um instrumento musical ou as ondas do mar. O som precisa das moléculas de ar colidindo para chegar aos nossos ouvidos.",
        mitoComum: "As explosões ensurdecedoras em filmes de batalhas espaciais. Fato: No vácuo do espaço sideral não tem ar, então o silêncio é 100% absoluto!",
        tags: ["onda mecânica", "som", "ar", "voz", "vibração", "matéria"]
    },
    {
        id: "onda_eletromagnetica",
        termo: "Onda Eletromagnética",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "📡",
        definicaoSimples: "É uma onda formada por campos elétricos e magnéticos que viaja pelo ar e até pelo vácuo do espaço na velocidade da luz (300.000 km/s). Não precisa de ar nenhum!",
        exemploCotidiano: "O sinal de Wi-Fi da sala, a internet 5G do celular, a luz da lâmpada, o rádio do carro e o controle remoto da TV.",
        mitoComum: "Achar que o Wi-Fi precisa de corrente de ar para chegar até o celular. Fato: As ondas de rádio viajam no espaço livremente!",
        tags: ["onda eletromagnética", "wifi", "5g", "celular", "luz", "velocidade da luz"]
    },
    {
        id: "frequencia",
        termo: "Frequência (Hertz - Hz)",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "📊",
        definicaoSimples: "É o número de oscilações que a onda faz a cada 1 segundo. Frequência alta significa vibrações ultrarrápidas; frequência baixa significa vibrações mais lentas.",
        exemploCotidiano: "No som: voz grossa (grave) tem frequência baixa; apito fino (agudo) tem frequência alta. No Wi-Fi: 2.4 GHz oscila 2,4 bilhões de vezes por segundo!",
        mitoComum: "Confundir frequência com volume. Fato: Frequência define se o som é grave ou agudo; o volume é definido pela amplitude da onda!",
        tags: ["frequência", "hertz", "grave", "agudo", "vibração", "segundo"]
    },
    {
        id: "comprimento_onda",
        termo: "Comprimento de Onda",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "📏",
        definicaoSimples: "É a distância entre duas cristas (dois topos) seguidos de uma onda. A regra é: quanto mais alta for a frequência, menor e mais curtinha é a onda!",
        exemploCotidiano: "O 5G tem frequência super alta, então sua onda é minúscula (poucos centímetros). Por isso a antena cabe escondida dentro do celular!",
        mitoComum: "Achar que celulares modernos não têm antena. Fato: Eles têm antenas minúsculas (2,5 cm) feitas exatamente para o tamanho da onda do 5G.",
        tags: ["comprimento de onda", "antena", "tamanho", "crista", "curta", "longa"]
    },
    {
        id: "amplitude",
        termo: "Amplitude (Volume / Intensidade)",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "🎙️",
        definicaoSimples: "É a altura da crista da onda, que indica quanta energia ela carrega. No som, crista alta significa volume forte; crista baixa significa som baixinho.",
        exemploCotidiano: "Na gravação do podcast, aumentar o botão de ganho (volume) do microfone faz a crista da onda na tela do computador ficar mais alta.",
        mitoComum: "Achar que gritar mais alto no microfone deixa a voz mais fina. Fato: Gritar só aumenta a amplitude (volume), mas a frequência da sua voz continua a mesma.",
        tags: ["amplitude", "volume", "altura", "podcast", "estúdio", "som"]
    },
    {
        id: "radiacao_nao_ionizante",
        termo: "Radiação Não Ionizante (Segura)",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "📶",
        definicaoSimples: "São ondas de baixa energia que NÃO têm força para quebrar átomos nem arrancar elétrons do DNA humano. São inofensivas e seguras para a saúde.",
        exemploCotidiano: "As ondas de rádio FM, os sinais de Wi-Fi, o sinal de rede móvel 4G/5G e a luz visível de qualquer lâmpada da casa.",
        mitoComum: "Boatos falsos na internet dizendo que torres de celular transmitem doenças ou vírus. Fato: Vírus são agentes biológicos; ondas de rádio são oscilações eletromagnéticas inofensivas que só carregam dados.",
        tags: ["não ionizante", "segurança", "5g", "saúde", "dna", "boato"]
    },
    {
        id: "radiacao_ionizante",
        termo: "Radiação Ionizante (Forte / Cuidado)",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "☢️",
        definicaoSimples: "São ondas e partículas de altíssima energia com força suficiente para quebrar moléculas e alterar o DNA, exigindo proteção especial com paredes de chumbo.",
        exemploCotidiano: "Os aparelhos de Raio-X nos hospitais e a energia nuclear. Por isso o técnico de radiologia sai da sala ou usa avental de chumbo.",
        mitoComum: "Achar que o micro-ondas da cozinha ou o celular emitem radiação ionizante. Fato: O micro-ondas usa ondas de rádio seguras; ao desligar, a onda cessa na hora!",
        tags: ["ionizante", "raio-x", "chumbo", "hospital", "dna", "perigo"]
    },
    {
        id: "vacuo",
        termo: "Vácuo",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "🌌",
        definicaoSimples: "Região do espaço onde não existe matéria nenhuma: zero ar, zero átomos, zero moléculas. É a ausência total de matéria.",
        exemploCotidiano: "O espaço sideral entre os planetas, o interior da campânula de vidro no laboratório e a parede dupla da garrafa térmica.",
        mitoComum: "Achar que nenhuma onda viaja no vácuo. Fato: O som não viaja no vácuo (precisa de ar), mas o Wi-Fi e a luz viajam perfeitamente nele na velocidade máxima!",
        tags: ["vácuo", "espaço", "sem ar", "garrafa térmica", "som", "luz"]
    },
    {
        id: "atenuacao",
        termo: "Atenuação de Sinal (Obstáculos)",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "🧱",
        definicaoSimples: "É a perda gradual de potência que a onda de sinal sofre quando precisa atravessar paredes de tijolos, móveis de metal e pisos de concreto.",
        exemploCotidiano: "O Wi-Fi de 5 GHz é ultrarrápido quando você está do lado do roteador, mas sofre forte atenuação ao atravessar duas paredes até o quarto dos fundos.",
        mitoComum: "Achar que a internet ficou lenta por defeito do provedor quando o roteador está escondido dentro de um guarda-roupa ou atrás da TV de metal.",
        tags: ["atenuação", "obstáculo", "parede", "tijolo", "wifi", "sinal"]
    },
    {
        id: "espectro_eletromagnetico",
        termo: "Espectro Eletromagnético",
        categoria: "ano3",
        turmaNome: "3º Ano • Ondas e Telecom",
        icone: "🌈",
        definicaoSimples: "É a grande 'família' de todas as ondas eletromagnéticas existentes no universo, organizadas da mais fraca e comprida (rádio) até a mais forte e curta (raios gama).",
        exemploCotidiano: "Rádio ➔ Micro-ondas ➔ Infravermelho ➔ Luz Visível ➔ Ultravioleta ➔ Raios-X ➔ Raios Gama. Todas são a mesma coisa, mudando apenas a frequência!",
        mitoComum: "Achar que a luz dos olhos e o sinal do celular são coisas totalmente diferentes. Fato: Ambas são ondas eletromagnéticas da mesma família!",
        tags: ["espectro", "família", "luz", "rádio", "raios-x", "ondas"]
    }
];

// Mapeamento contextual de termos por missão
const MISSAO_VOCAB_MAP = {
    // 1º Ano (17 Fases)
    "m1_1": ["inercia", "desaceleracao"],
    "m1_2": ["inercia", "atrito"],
    "m1_3": ["atrito_abs", "aderencia"],
    "m1_4": ["forca_impacto", "colisao"],
    "m1_5": ["inercia", "atrito", "forca_impacto"],
    "m1_6": ["colisao", "deformacao_programada", "tempo_reacao"],
    "m1_7": ["inercia", "empuxo", "aderencia"],
    "m1_8": ["atrito", "empuxo", "desaceleracao"],
    "m1_9": ["deformacao_programada", "colisao", "forca_impacto"],
    "m1_10": ["tempo_reacao", "desaceleracao"],
    "m1_11": ["tempo_reacao", "desaceleracao", "atrito"],
    "m1_12": ["inercia", "colisao", "desaceleracao"],
    "m1_13": ["inercia", "forca_impacto"],
    "m1_14": ["atrito", "aderencia", "inercia"],
    "m1_15": ["inercia", "forca_impacto", "deformacao_programada"],
    "m1_16": ["atrito", "inercia", "aderencia"],
    "m1_17": ["inercia", "colisao", "atrito_abs"],

    // 2º Ano (17 Fases)
    "m2_1": ["calor", "temperatura", "radiacao"],
    "m2_2": ["conducao", "conveccao", "radiacao"],
    "m2_3": ["vacuo", "conducao", "radiacao"],
    "m2_4": ["condutor_termico", "isolante_termico"],
    "m2_5": ["albedo", "radiacao", "ilha_calor"],
    "m2_6": ["albedo", "isolante_termico", "conveccao"],
    "m2_7": ["calor", "temperatura", "isolante_termico"],
    "m2_8": ["albedo", "conveccao", "ilha_calor"],
    "m2_9": ["efeito_chamine", "conveccao"],
    "m2_10": ["isolante_termico", "radiacao"],
    "m2_11": ["conforto_termico", "isolante_termico"],
    "m2_12": ["temperatura", "calor", "conveccao"],
    "m2_13": ["radiacao", "calor", "temperatura"],
    "m2_14": ["isolante_termico", "conducao", "albedo"],
    "m2_15": ["conducao", "conveccao", "radiacao", "albedo"],
    "m2_16": ["albedo", "isolante_termico", "efeito_chamine"],
    "m2_17": ["conveccao", "albedo", "efeito_chamine"],

    // 3º Ano (15 Fases)
    "m3_1": ["radiacao_nao_ionizante", "radiacao_ionizante"],
    "m3_2": ["espectro_eletromagnetico", "onda_eletromagnetica"],
    "m3_3": ["comprimento_onda", "frequencia"],
    "m3_4": ["onda_mecanica", "onda_eletromagnetica", "frequencia"],
    "m3_5": ["onda_mecanica", "onda_eletromagnetica", "vacuo"],
    "m3_6": ["onda_eletromagnetica", "frequencia", "radiacao_nao_ionizante"],
    "m3_7": ["radiacao_nao_ionizante", "espectro_eletromagnetico"],
    "m3_8": ["atenuacao", "frequencia", "comprimento_onda"],
    "m3_9": ["onda_mecanica", "amplitude", "frequencia"],
    "m3_10": ["atenuacao", "onda_eletromagnetica"],
    "m3_11": ["onda_mecanica", "onda_eletromagnetica"],
    "m3_12": ["onda_mecanica", "amplitude", "atenuacao"],
    "m3_13": ["onda_eletromagnetica", "espectro_eletromagnetico"],
    "m3_14": ["amplitude", "onda_mecanica"],
    "m3_15": ["atenuacao", "radiacao_nao_ionizante", "onda_mecanica"]
};

window.getTermosMissao = function(missaoId) {
    const ids = MISSAO_VOCAB_MAP[missaoId] || [];
    return ids.map(id => VOCABULARIO_FISICO.find(t => t.id === id)).filter(Boolean);
};

window.getTermoById = function(termoId) {
    return VOCABULARIO_FISICO.find(t => t.id === termoId);
};

window.VOCABULARIO_FISICO = VOCABULARIO_FISICO;

