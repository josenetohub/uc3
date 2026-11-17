// Banco de Dados Pedagógico Completo e Expandido por Turma
// Inclui novos jogos interativos: Relacionar Colunas, Completar Lacunas, Classificar Materiais, Duelo de Wi-Fi e Cálculos de Trânsito.

const TURMAS_DATA = {
    ano1: {
        id: "ano1",
        nome: "1º Ano - Trânsito, Batidas & Segurança",
        subtitulo: "Aprenda na prática como as leis do movimento salvam vidas!",
        corTema: "#2563eb",
        badge: "🛡️ Defensor da Segurança no Trânsito",
        cenario: "Pista de Testes & Laboratório de Trânsito",
        playerSpawn: { x: 4, y: 9 },
        missoes: [
            {
                id: "m1_1",
                titulo: "Fase 1: Por que voamos na freada? (A Lei da Inércia e o Cinto)",
                codigoBNCC: "Inércia & Cinto de Segurança",
                npc: "Mariana (Instrutora de Direção)",
                local: "Pista de Frenagem",
                posTarget: { x: 6, y: 4 },
                icone: "🚗",
                resumo: "Veja o que acontece com o corpo quando o carro freia no susto.",
                dialogoNPC: "Olá! A regra da Inércia é bem simples: tudo o que está correndo quer continuar correndo até que algo segure! Se o carro bate ou freia de repente a 72 km/h, o seu corpo não freia sozinho: ele continua voando a 72 km/h! O cinto de segurança é justamente o que puxa você de volta e não deixa você voar pelo vidro.",
                tipo: "simulacao_inercia",
                calcData: {
                    massa: 70,
                    velocidadeKmh: 72,
                    pergunta: "Um passageiro pesa 70 kg e está no carro a 72 km/h (que são 20 metros por segundo). Para saber o tamanho do 'embalo' do corpo dele que quer continuar correndo, basta multiplicar o peso pela velocidade (70 × 20). Qual é o resultado desse embalo?",
                    unidade: "pontos de embalo",
                    opcoes: [
                        { valor: "500", correta: false, explicacao: "Faça a conta com calma: 70 vezes 20." },
                        { valor: "1.400", correta: true, explicacao: "Muito bem! 70 × 20 = 1.400. Sem o cinto, todo esse embalo joga a pessoa com uma força violenta contra o painel ou o vidro do carro!" },
                        { valor: "92", correta: false, explicacao: "Cuidado: multiplique o peso pela velocidade (70 vezes 20)." }
                    ]
                }
            },
            {
                id: "m1_2",
                titulo: "Fase 2: Jogo de Relacionar - A Inércia no Dia a Dia",
                codigoBNCC: "Inércia em Situações Cotidianas",
                npc: "Beto (Perito em Dinâmica)",
                local: "Oficina de Investigação",
                posTarget: { x: 10, y: 5 },
                icone: "🔗",
                resumo: "Conecte cada situação real com a explicação científica da Inércia.",
                dialogoNPC: "A Inércia não acontece só em batidas de carro! Ela está presente quando o ônibus freia, quando andamos a cavalo e até ao sacudir poeira. Clique em uma situação e depois na explicação correspondente para ligar os pares!",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "p1", ladoA: "Ônibus freia no ponto e passageiros são jogados para a frente", ladoB: "Os passageiros mantêm a velocidade que tinham antes de o freio parar o ônibus", parId: 1 },
                    { id: "p2", ladoA: "Cavalo empaca no obstáculo e o cavaleiro voa por cima", ladoB: "O cavalo parou, mas o corpo do cavaleiro continuou em movimento no ar", parId: 2 },
                    { id: "p3", ladoA: "Sacudir o tapete com força para soltar a poeira", ladoB: "O pano do tapete anda rápido, mas a poeira quer ficar parada no ar", parId: 3 },
                    { id: "p4", ladoA: "Puxar rápido o papel sob a moeda e ela cai dentro do copo", ladoB: "O papel deslizou, mas a moeda continuou em repouso e caiu pela gravidade", parId: 4 }
                ]
            },
            {
                id: "m1_3",
                titulo: "Fase 3: O Mistério do Freio ABS (Rodas Travadas vs Controle)",
                codigoBNCC: "Atrito Estático vs Cinético & ABS",
                npc: "Renato (Piloto de Testes Veiculares)",
                local: "Pista Especial de Testes ABS",
                posTarget: { x: 22, y: 6 },
                icone: "🛞",
                resumo: "Descubra por que travar as rodas faz o carro derrapar reto sem conseguir desviar.",
                dialogoNPC: "Muita gente acha que frear com tudo até travar as rodas é o jeito mais rápido de parar. ERRADO! Quando a roda trava, o pneu derrapa (atrito cinético, que segura menos) e o volante perde totalmente a direção: o carro vai reto contra o obstáculo! O sistema ABS solta e aperta o freio 20 vezes por segundo, impedindo o travamento e permitindo que você desvie do perigo!",
                tipo: "simulacao_abs",
                calcData: {
                    pergunta: "No freio comum sem ABS, a roda trava e o pneu derrapa escorregando no chão. Por que com a roda travada o motorista NÃO consegue desviar de um obstáculo mesmo virando o volante com toda a força?",
                    unidade: "Explicação Física",
                    opcoes: [
                        { valor: "Porque com as rodas escorregando reto, não há aderência para mudar a trajetória", correta: true, explicacao: "Exatamente! O pneu escorregando desliza na direção que já vinha. O freio ABS mantém a roda girando para você conseguir desviar do perigo!" },
                        { valor: "Porque o volante desliga sozinho durante a freada", correta: false, explicacao: "O volante não desliga; o problema é que as rodas travadas não conseguem direcionar o carro." },
                        { valor: "Porque o motor puxa o carro sempre em linha reta", correta: false, explicacao: "O motor fica desconectado na freada; é a falta de atrito direcional que faz o carro derrapar." }
                    ]
                }
            },
            {
                id: "m1_4",
                titulo: "Fase 4: Por que o Airbag salva vidas? (Amortecendo a pancada)",
                codigoBNCC: "Airbags & Tempo da Batida",
                npc: "Beto (Mecânico Especialista)",
                local: "Oficina de Batidas",
                posTarget: { x: 14, y: 5 },
                icone: "💥",
                resumo: "Entenda por que aumentar o tempo da batida deixa o impacto muito mais fraco.",
                dialogoNPC: "Muita gente acha que o airbag é só um travesseiro macio. Mas o segredo dele é o TEMPO! Bater a cabeça no volante duro para o seu corpo num piscar de olhos (em apenas 0,02 segundo) — a pancada é seca e quebra os ossos! O airbag amortece e estica esse tempo para 0,20 segundo (10 vezes mais tempo). Com mais tempo para parar, a pancada fica 10 vezes mais suave!",
                tipo: "simulacao_impacto",
                calcData: {
                    pergunta: "Sem airbag, a pancada seca no volante é de 70.000 pontos de força (batida fatal). O airbag infla, estica o tempo e deixa a pancada 10 vezes mais fraca (70.000 dividido por 10). Qual é a força do impacto que sobra?",
                    unidade: "de força",
                    opcoes: [
                        { valor: "70.000", correta: false, explicacao: "70.000 é a força brutal SEM o airbag (pancada dura no volante)." },
                        { valor: "35.000", correta: false, explicacao: "Como o tempo aumentou 10 vezes, divida 70.000 por 10." },
                        { valor: "7.000", correta: true, explicacao: "Exatamente! 70.000 ÷ 10 = 7.000. O airbag reduziu a pancada em 10 vezes, transformando um acidente fatal em algo que o corpo consegue sobreviver!" }
                    ]
                }
            },
            {
                id: "m1_5",
                titulo: "Fase 5: Complete as Palavras da Segurança Veicular",
                codigoBNCC: "Vocabulário Científico do Trânsito",
                npc: "Dra. Carla (Pesquisadora Viária)",
                local: "Bancada de Estudos",
                posTarget: { x: 16, y: 7 },
                icone: "🧩",
                resumo: "Encaixe as palavras corretas nas lacunas sobre leis do movimento e segurança.",
                dialogoNPC: "Vamos fixar os conceitos principais! Clique nas palavras do banco de dados para preencher as lacunas corretas das 4 frases de trânsito.",
                tipo: "jogo_completar",
                lacunasData: {
                    frases: [
                        { pre: "Pela lei da ", palavra: "INÉRCIA", pos: ", um corpo em movimento tende a continuar correndo até que algo o segure." },
                        { pre: "O airbag protege a vida porque estica o ", palavra: "TEMPO", pos: " da colisão, diminuindo a pancada no peito." },
                        { pre: "Passageiro solto atrás é arremessado e bate na frente com uma ", palavra: "FORÇA", pos: " de várias toneladas." },
                        { pre: "Em dias de chuva, a água reduz o ", palavra: "ATRITO", pos: " entre os pneus e o asfalto, fazendo o carro deslizar longe." }
                    ],
                    bancoPalavras: ["INÉRCIA", "TEMPO", "FORÇA", "ATRITO", "GRAVIDADE", "CALOR", "ESPELHO"]
                }
            },
            {
                id: "m1_6",
                titulo: "Fase 6: Mitos e Fatos da Segurança no Trânsito",
                codigoBNCC: "Conscientização Científica Viária",
                npc: "Capitão Mendes (Perito Oficial)",
                local: "Painel de Mitos e Fatos",
                posTarget: { x: 4, y: 13 },
                icone: "⚖️",
                resumo: "Separe as afirmações perigosas dos fatos comprovados pela física.",
                dialogoNPC: "Muitos jovens se acidentam por acreditar em mitos populares do trânsito. Classifique cada frase em FATO COMPROVADO ou MITO PERIGOSO para salvar vidas!",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados pela Física",
                subBinA: "Leis da mecânica e regras seguras",
                tituloBinB: "❌ Mitos Perigosos do Cotidiano",
                subBinB: "Crenças populares que causam acidentes",
                itensClassificar: [
                    { id: "f1", nome: "Passageiro sem cinto atrás é arremessado e esmaga quem está na frente", categoria: "fato", desc: "Pela inércia, o corpo de trás voa na freada com o peso de uma tonelada!" },
                    { id: "m1", nome: "Se bater a apenas 30 km/h, os braços conseguem segurar o corpo sem cinto", categoria: "mito", desc: "A 30 km/h, segurar o corpo equivale a tentar segurar uma geladeira de 300 kg no ar!" },
                    { id: "f2", nome: "A lataria moderna amassa como sanfona para absorver o impacto da colisão", categoria: "fato", desc: "Deformar a frente estica o tempo de desaceleração e protege a cabine interna." },
                    { id: "m2", nome: "Carro mais pesado freia mais rápido porque aperta mais o chão", categoria: "mito", desc: "Mais massa tem mais inércia e mais energia, exigindo mais esforço do freio!" },
                    { id: "f3", nome: "Mexer no celular 2 segundos a 72 km/h equivale a andar 40 metros às cegas", categoria: "fato", desc: "A 72 km/h são 20 m/s; em 2 segundos de distração o carro anda 40 metros sem ninguém olhando." },
                    { id: "m3", nome: "Bicicletas e motos não precisam se preocupar com as leis da inércia", categoria: "mito", desc: "Pelo contrário: sem cinto nem cabine, o piloto de moto voa longe na freada brusca." }
                ]
            },
            {
                id: "m1_7",
                titulo: "Fase 7: A Física das Duas Rodas (Bikes, Motos & Inércia)",
                codigoBNCC: "Dinâmica e Segurança em 2 Rodas",
                npc: "Juliana (Ciclista & Instrutora)",
                local: "Bancada de Motos e Bikes",
                posTarget: { x: 16, y: 12 },
                icone: "🚲",
                resumo: "Conecte os conceitos da física aos cuidados essenciais em motos e bicicletas.",
                dialogoNPC: "Quem anda de moto ou bicicleta sente as leis da física no próprio corpo! Ligue cada situação de duas rodas à sua explicação física correta.",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "b1", ladoA: "Capacete com camada espessa de isopor interno", ladoB: "O isopor amassa na batida, esticando o tempo e diminuindo a pancada no crânio", parId: 1 },
                    { id: "b2", ladoA: "Apertar só o freio dianteiro da bicicleta no susto", ladoB: "A inércia joga todo o peso para a frente e o ciclista capota por cima do guidão", parId: 2 },
                    { id: "b3", ladoA: "Roupas claras e faixas retrorefletivas à noite", ladoB: "Refletem a luz dos faróis dos carros direto de volta para os olhos dos motoristas", parId: 3 },
                    { id: "b4", ladoA: "Pneu gasto de moto em pista com poça d'água", ladoB: "A lâmina de água anula o atrito e a roda desliza sem aderência (aquaplanagem)", parId: 4 }
                ]
            },
            {
                id: "m1_8",
                titulo: "Fase 8: Pista Molhada e Distância de Freio (Atrito & Velocidade)",
                codigoBNCC: "Atrito, Chuva & Distância de Parada",
                npc: "Renato (Piloto de Testes)",
                local: "Circuito de Pistas Especiais",
                posTarget: { x: 18, y: 6 },
                icone: "🌧️",
                resumo: "Veja por que correr o dobro exige 4 vezes mais espaço para conseguir frear!",
                dialogoNPC: "Muita gente acha que se correr o dobro da velocidade, só precisa do dobro de espaço para parar. ERRADO! A física da energia mostra que dobrar a velocidade exige 4 VEZES mais pista para o freio segurar! E se a pista estiver molhada pela chuva, a água faz as rodas escorregarem e a distância dobra de novo!",
                tipo: "simulacao_frenagem",
                calcData: {
                    pergunta: "A 40 km/h no asfalto seco, o carro precisa de 10 metros para frear totalmente. Se o motorista correr ao dobro da velocidade (80 km/h), ele precisará de 4 vezes mais espaço de pista (10 metros × 4). Quantos metros ele vai precisar para parar?",
                    unidade: "metros de pista",
                    opcoes: [
                        { valor: "20 metros", correta: false, explicacao: "Cuidado: dobrar a velocidade não dobra a distância, multiplica por 4!" },
                        { valor: "40 metros", correta: true, explicacao: "Perfeito! 10 × 4 = 40 metros! É por isso que pequenos aumentos de velocidade no trânsito causam acidentes graves." },
                        { valor: "14 metros", correta: false, explicacao: "Multiplique 10 por 4." }
                    ]
                }
            },
            {
                id: "m1_9",
                titulo: "Fase 9: Por que os Carros Modernos Amassam? (Zonas de Deformação)",
                codigoBNCC: "Absorção de Energia & Deformação Programada",
                npc: "Engº Marcelo (Engenheiro Automotivo)",
                local: "Hangar de Batidas e Lataria",
                posTarget: { x: 24, y: 8 },
                icone: "🚗",
                resumo: "Compare a batida de um carro duro antigo contra um carro moderno deformável.",
                dialogoNPC: "Antigamente diziam: 'bom era carro antigo, feito de ferro maciço que batia e não amassava nada!'. Mas por que as pessoas morriam muito mais neles? Se o carro não amassa, toda a energia violenta da parada é jogada nos ossos e órgãos dos passageiros! Os carros de hoje têm a frente feita em sanfona: ela amassa de propósito para engolir o impacto, mantendo a cabine intacta!",
                tipo: "simulacao_deformacao",
                calcData: {
                    pergunta: "Um carro antigo duro bate e para seco em 0,03 s, gerando uma pancada brutal de 60.000 pontos. Um carro moderno amassa a frente em sanfona e estica o tempo de parada para 0,15 s (5 vezes mais tempo!). Dividindo 60.000 por 5, quanto sobra de impacto no corpo?",
                    unidade: "pontos de força",
                    opcoes: [
                        { valor: "60.000 pontos (a força é sempre igual)", correta: false, explicacao: "Aumentar o tempo divide a força da pancada. 60.000 dividido por 5 é igual a 12.000." },
                        { valor: "12.000 pontos (impacto 5 vezes menor e perfeitamente suportável!)", correta: true, explicacao: "Perfeito! 60.000 ÷ 5 = 12.000 pontos! Ao amassar de propósito, a lataria moderna reduziu o impacto em 5 vezes, salvando os órgãos internos dos passageiros!" },
                        { valor: "300.000 pontos", correta: false, explicacao: "Você multiplicou em vez de dividir." }
                    ]
                }
            },
            {
                id: "m1_10",
                titulo: "Fase 10: Desafio do Perito - Cálculos Rápidos de Frenagem",
                codigoBNCC: "Cálculos Práticos de Trânsito",
                npc: "Capitão Mendes (Perito Oficial)",
                local: "Mesa de Análise de Acidentes",
                posTarget: { x: 12, y: 11 },
                icone: "📐",
                resumo: "Calcule a distância de reação e o espaço total de parada do veículo.",
                dialogoNPC: "Antes de o freio agir, existe o 'Tempo de Reação': o tempo que seus olhos levam para ver o perigo e o seu pé levar para pisar no pedal (cerca de 1 segundo). Vamos calcular quantos metros o carro anda nesse piscar de olhos!",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "A 72 km/h, o carro anda 20 metros a cada 1 segundo. Se o motorista demorar 1 segundo de reação até pisar no pedal de freio, quantos metros o carro andou às cegas?",
                        opcoes: [
                            { valor: "20 metros", correta: true, explicacao: "Exato! Em 1 segundo a 72 km/h, o carro anda 20 metros sem nem ter encostado no freio ainda!" },
                            { valor: "5 metros", correta: false, explicacao: "A 72 km/h, são 20 metros por segundo." },
                            { valor: "72 metros", correta: false, explicacao: "72 é a velocidade em km/h, não os metros em 1 segundo (20 m)." }
                        ]
                    },
                    {
                        q: "Se o carro andou 20 metros no tempo de reação e depois precisou de mais 40 metros para as rodas frearem, qual foi a DISTÂNCIA TOTAL de parada (20 + 40)?",
                        opcoes: [
                            { valor: "40 metros", correta: false, explicacao: "Não esqueça de somar os 20 metros do tempo de reação." },
                            { valor: "60 metros", correta: true, explicacao: "Perfeito! 20 m + 40 m = 60 metros no total! É mais de meio quarteirão!" },
                            { valor: "80 metros", correta: false, explicacao: "Some 20 com 40." }
                        ]
                    }
                ]
            },
            {
                id: "m1_11",
                titulo: "Fase 11: A Regra dos 2 Segundos (Distância de Segurança na Estrada)",
                codigoBNCC: "Prevenção de Colisões Traseiras",
                npc: "Sgt. Oliveira (Polícia Rodoviária)",
                local: "Posto da Rodovia",
                posTarget: { x: 6, y: 8 },
                icone: "⏱️",
                resumo: "Aprenda a calcular a distância segura para nunca bater na traseira do carro da frente.",
                dialogoNPC: "Para não bater no carro da frente, os motoristas profissionais usam a 'Regra dos 2 Segundos'! Quando o carro da frente passar por um poste, comece a contar pausadamente: 'mil e um, mil e dois'. Se você passar pelo poste antes de terminar de contar, está perto demais! Vamos calcular o tamanho dessa distância segura.",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "Na rodovia a 90 km/h, o carro corre a 25 metros por segundo. Quantos metros de distância segura o carro deve manter para cumprir a regra dos 2 segundos ($25 \times 2$)?",
                        opcoes: [
                            { valor: "50 metros (meio campo de futebol de distância segura!)", correta: true, explicacao: "Perfeito! 25 × 2 = 50 metros. Essa distância dá tempo de ver o freio do outro carro acender e frear com calma sem bater!" },
                            { valor: "25 metros", correta: false, explicacao: "Multiplique 25 por 2 segundos." },
                            { valor: "90 metros", correta: false, explicacao: "90 é a velocidade em km/h, não a distância dos 2 segundos." }
                        ]
                    },
                    {
                        q: "Em dia de chuva, o chão fica liso e a distância de segurança precisa DOBRAR! Qual deve ser o espaço agora ($50 \times 2$)?",
                        opcoes: [
                            { valor: "100 metros (distância redobrada na chuva!)", correta: true, explicacao: "Sensacional! 50 × 2 = 100 metros. Na chuva, manter 100 metros garante que o carro pare com segurança mesmo se deslizar na água!" },
                            { valor: "50 metros", correta: false, explicacao: "Na chuva precisamos do dobro de espaço (50 vezes 2)." },
                            { valor: "75 metros", correta: false, explicacao: "Dobre 50 metros." }
                        ]
                    }
                ]
            },
            {
                id: "m1_12",
                titulo: "Fase 12: O Perigo dos Objetos Soltos (O Peso Invisível da Inércia)",
                codigoBNCC: "Inércia e Projéteis Internos",
                npc: "Dra. Carla (Pesquisadora Viária)",
                local: "Bancada de Pesagem e Dinâmica",
                posTarget: { x: 8, y: 6 },
                icone: "📱",
                resumo: "Calcule o peso aparente de um celular solto no painel durante uma batida violenta.",
                dialogoNPC: "Muitos motoristas deixam garrafas de água, celulares e mochilas soltos no banco ou no painel. Pela Lei da Inércia, quando o carro bate e para seco a 60 km/h, o objeto solto continua voando na velocidade do carro! Com a desaceleração violenta (30 vezes a gravidade), o objeto atinge a cabeça dos passageiros com 30 vezes o seu peso normal! Vamos fazer as contas desse projétil invisível.",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "Um smartphone comum pesa 200 gramas (0,2 kg). Em uma batida onde a desaceleração é de 30G, o objeto atinge o passageiro com 30 vezes o seu peso ($0,2 \\times 30$). Qual é o peso do impacto desse celular na cabeça?",
                        opcoes: [
                            { valor: "6 kg (o peso de um saco de arroz ou uma bola de boliche batendo na nuca!)", correta: true, explicacao: "Exatamente! 0,2 × 30 = 6 kg! Um celular aparentemente levinho vira um projétil destruidor dentro da cabine pela inércia!" },
                            { valor: "0,2 kg (o peso não muda nada na batida)", correta: false, explicacao: "O peso normal não muda na balança, mas a força de impacto multiplica por 30 devido à violenta desaceleração!" },
                            { valor: "60 kg", correta: false, explicacao: "Multiplique 0,2 por 30." }
                        ]
                    },
                    {
                        q: "E se for uma garrafa de água cheia de 1 kg solta no tampão traseiro? Multiplicando seu peso pelos mesmos 30G de impacto ($1 \\times 30$), qual será a força do golpe?",
                        opcoes: [
                            { valor: "30 kg (o peso de uma criança ou um botijão de gás voando contra o banco da frente!)", correta: true, explicacao: "Perfeito! 1 × 30 = 30 kg! Qualquer objeto solto no carro vira uma arma mortal na freada brusca. Tudo deve ficar no porta-malas ou preso!" },
                            { valor: "1 kg", correta: false, explicacao: "A desaceleração multiplica o peso por 30." },
                            { valor: "15 kg", correta: false, explicacao: "Multiplique 1 por 30." }
                        ]
                    }
                ]
            },
            {
                id: "m1_13",
                titulo: "Fase 13: O Encosto de Cabeça e o Efeito Chicote (Whiplash)",
                codigoBNCC: "Inércia Cervical & Batidas Traseiras",
                npc: "Beto (Perito em Dinâmica)",
                local: "Oficina de Bancos e Ergonomia",
                posTarget: { x: 22, y: 12 },
                icone: "💺",
                resumo: "Conecte a física do encosto de cabeça à proteção do pescoço em batidas traseiras.",
                dialogoNPC: "Muita gente acha que o encosto do banco do carro serve apenas para apoiar a cabeça quando estiver cansado. ERRADO! Em uma colisão traseira, o carro e o encosto das costas são empurrados bruscamente para a frente. Pela inércia, a sua cabeça quer continuar parada! Sem o encosto na altura correta, o pescoço dobra violentamente para trás e depois chicoteia para a frente (o temido Efeito Chicote), quebrando vértebras! Ligue as situações às explicações científicas.",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "e1", ladoA: "Carro parado é atingido por trás e o corpo é empurrado pelo banco", ladoB: "Pela inércia, a cabeça quer ficar no mesmo lugar e dobra bruscamente para trás", parId: 1 },
                    { id: "e2", ladoA: "Encosto de cabeça regulado na altura dos olhos e orelhas", ladoB: "Limita o movimento da cabeça, mantendo o pescoço alinhado junto com o tronco", parId: 2 },
                    { id: "e3", ladoA: "Encosto de cabeça abaixado demais na altura do pescoço", ladoB: "Vira um ponto de apoio perigoso que alavanca e quebra a coluna cervical para trás", parId: 3 },
                    { id: "e4", ladoA: "O movimento de rebote para a frente logo após a pancada", ladoB: "O cinto de segurança com pré-tensionador segura o peito e impede o choque no volante", parId: 4 }
                ]
            },
            {
                id: "m1_14",
                titulo: "Fase 14: Curvas na Rodovia (Inércia e Atrito Lateral)",
                codigoBNCC: "Força Centrípeta & Atrito Lateral em Curvas",
                npc: "Renato (Piloto de Testes)",
                local: "Pista Circular de Curvas",
                posTarget: { x: 24, y: 4 },
                icone: "🔄",
                resumo: "Classifique afirmações sobre por que os carros querem sair em linha reta nas curvas.",
                dialogoNPC: "Quando você faz uma curva com o carro ou a moto, a 1ª Lei de Newton continua agindo: seu veículo quer continuar em LINHA RETA (sair pela tangente)! O que puxa o carro para dentro da curva é a força de atrito lateral dos pneus contra o asfalto. Se houver óleo, água ou excesso de velocidade, o atrito não aguenta e o carro escorrega para fora da pista! Classifique os fatos e mitos das curvas.",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados das Curvas",
                subBinA: "Atrito lateral e física do movimento curvilíneo",
                tituloBinB: "❌ Mitos Perigosos em Curvas",
                subBinB: "Crenças erradas que causam capotamento",
                itensClassificar: [
                    { id: "f1", nome: "O carro só faz a curva se houver atrito lateral suficiente entre os pneus e o chão", categoria: "fato", desc: "Sem atrito lateral, o volante pode virar o quanto quiser que o carro segue reto pela inércia!" },
                    { id: "m1", nome: "Existe uma força misteriosa que puxa o carro de propósito para fora da curva", categoria: "mito", desc: "Não há força puxando para fora; é apenas a inércia querendo continuar em linha reta!" },
                    { id: "f2", nome: "Entrar muito rápido na curva exige mais atrito do que a borracha do pneu aguenta", categoria: "fato", desc: "A força necessária para curvar cresce com o quadrado da velocidade; correr um pouco a mais já derrapa!" },
                    { id: "m2", nome: "Pneus carecas fazem curvas melhor no asfalto seco porque têm mais borracha lisa", categoria: "mito", desc: "Pneu careca não tem aderência estrutural e na primeira sujeira perde o controle por completo!" },
                    { id: "f3", nome: "Reduzir a velocidade e frear ANTES da curva é a regra segura para manter o controle", categoria: "fato", desc: "Frear com tudo dentro da curva trava as rodas e faz o veículo rodopiar na pista!" },
                    { id: "m3", nome: "Em curvas fechadas é seguro puxar o freio de mão para o carro virar mais rápido", categoria: "mito", desc: "Travar as rodas traseiras destrói o atrito lateral e causa perda total de direção e capotamento!" }
                ]
            },
            {
                id: "m1_15",
                titulo: "Fase 15: Escrevendo o Mapa Mental no seu Caderno Escolar",
                codigoBNCC: "Atividade Prática no Caderno Escolar",
                npc: "Prof. Arthur (Orientador de Estudos)",
                local: "Bancada de Desenho & Projetos",
                posTarget: { x: 8, y: 11 },
                icone: "✏️",
                resumo: "Abra o seu caderno real e desenhe o mapa mental guiado pelo jogo!",
                dialogoNPC: "Pegue seu caderno de aula e uma caneta! Vamos organizar tudo o que você aprendeu em um lindo Mapa Mental no papel. O jogo vai te mostrar o passo a passo de cada ramo para você desenhar aí no seu caderno físico!",
                tipo: "maker_mapa_mental",
                centroMapa: {
                    titulo: "FÍSICA & SEGURANÇA NO TRÂNSITO",
                    subtitulo: "1º Ano do Ensino Médio • 4º Bimestre",
                    icone: "🚗",
                    cor: "#ef4444"
                },
                ramosMapaMental: [
                    {
                        id: "r1",
                        numero: "1",
                        tag: "RAMO 1",
                        icone: "🚙",
                        nome: "Inércia (1ª Lei de Newton)",
                        dicaDesenho: "Canto Superior Esquerdo",
                        cor: "#2563eb",
                        itens: [
                            "O corpo quer continuar na mesma velocidade e direção do carro",
                            "O cinto de segurança é a força que te puxa de volta na freada",
                            "Passageiro solto atrás voa com peso de 1 tonelada sobre quem está na frente"
                        ]
                    },
                    {
                        id: "r2",
                        numero: "2",
                        tag: "RAMO 2",
                        icone: "🛡️",
                        nome: "Tempo da Batida & Airbags",
                        dicaDesenho: "Canto Superior Direito",
                        cor: "#d97706",
                        itens: [
                            "Mais tempo de desaceleração = Pancada no corpo 10 vezes menor",
                            "O airbag estica o tempo da parada de 0,02 s para 0,20 s",
                            "A lataria moderna amassa de propósito para absorver o impacto"
                        ]
                    },
                    {
                        id: "r3",
                        numero: "3",
                        tag: "RAMO 3",
                        icone: "🌧️",
                        nome: "Pista, Freio & Velocidade",
                        dicaDesenho: "Canto Inferior Esquerdo",
                        cor: "#15803d",
                        itens: [
                            "Dobrar a velocidade exige 4 vezes mais espaço de pista para conseguir frear",
                            "Chuva e água deixam o asfalto liso (pouco atrito com os pneus)",
                            "Aquaplanagem: os pneus perdem contato com o chão e flutuam sobre a água"
                        ]
                    },
                    {
                        id: "r4",
                        numero: "4",
                        tag: "RAMO 4",
                        icone: "🚦",
                        nome: "Atitudes que Salvam Vidas",
                        dicaDesenho: "Canto Inferior Direito",
                        cor: "#7c3aed",
                        itens: [
                            "Zero celular ao volante: 1 s de distração a 72 km/h = 20 m às cegas",
                            "Todos com cinto travado, inclusive no banco de trás",
                            "Respeitar o limite de velocidade e manter distância de segurança"
                        ]
                    }
                ]
            },
            {
                id: "m1_16",
                titulo: "Fase 16: Criando o Cartaz da Campanha de Trânsito",
                codigoBNCC: "Produção de Mídia Escolar",
                npc: "Arthur (Professor Orientador)",
                local: "Laboratório de Computação",
                posTarget: { x: 20, y: 10 },
                icone: "🖥️",
                resumo: "Monte o cartaz digital com cores vivas e frases verdadeiras.",
                dialogoNPC: "Agora que seu mapa mental está no caderno, vamos finalizar o cartaz digital da campanha da escola! Escolha 3 frases claras e verdadeiras para a publicação.",
                tipo: "maker_infografico",
                itensInfografico: [
                    { id: "c1", texto: "Quem está no carro corre junto com o carro: se o carro freia no susto, só o cinto segura você.", correto: true },
                    { id: "e1", texto: "Mito bobo: Não precisa usar cinto no banco de trás porque o banco da frente protege.", correto: false },
                    { id: "c2", texto: "O airbag salva vidas porque estica o tempo da batida, deixando o impacto no peito 10 vezes mais suave.", correto: true },
                    { id: "e2", texto: "Mito bobo: Carros mais pesados freiam sozinhos mais rápido do que carros leves.", correto: false },
                    { id: "c3", texto: "Correr rápido demais é perigoso: quanto mais rápido o carro corre, mais pista ele precisa para conseguir frear.", correto: true }
                ]
            },
            {
                id: "m1_17",
                titulo: "Fase 17: Perguntas Finais da Banca de Trânsito",
                codigoBNCC: "Avaliação do Bimestre",
                npc: "Equipe Avaliadora de Trânsito",
                local: "Auditório da Escola",
                posTarget: { x: 10, y: 14 },
                icone: "🎓",
                resumo: "Responda a 3 perguntas práticas sobre segurança para fechar a nota do bimestre.",
                dialogoNPC: "Muito bem! Para finalizar seu trabalho, responda a 3 perguntas práticas e mostre que sua equipe entendeu tudo sobre como salvar vidas no trânsito.",
                tipo: "banca_defesa",
                perguntasBanca: [
                    {
                        pergunta: "Por que quem está no banco de trás SEM cinto é um perigo enorme para quem está na frente?",
                        respostas: [
                            { txt: "Porque o peso da pessoa atrás faz o porta-malas abrir sozinho.", correta: false },
                            { txt: "Porque na freada ou batida, a pessoa de trás continua voando para a frente e bate com o peso de uma tonelada em cima do motorista.", correta: true },
                            { txt: "Porque o ar de dentro do carro empurra as pessoas para os lados.", correta: false }
                        ]
                    },
                    {
                        pergunta: "Por que os carros de hoje amassam a frente na batida em vez de serem feitos de ferro duro que não amassa?",
                        respostas: [
                            { txt: "Porque ao amassar, a lataria absorve a pancada e dá mais tempo para as pessoas pararem sem quebrar o corpo.", correta: true },
                            { txt: "Porque a montadora economiza dinheiro usando lata mais fina.", correta: false },
                            { txt: "Para o carro poder quicar para trás feito uma bola de borracha.", correta: false }
                        ]
                    },
                    {
                        pergunta: "Por que na chuva o carro demora muito mais para conseguir parar completamente?",
                        respostas: [
                            { txt: "Porque a água entra nas rodas e desliga o volante.", correta: false },
                            { txt: "Porque a água deixa o carro pesado demais para o freio funcionar.", correta: false },
                            { txt: "Porque a água deixa o chão escorregadio (menos atrito), fazendo as rodas deslizarem mais longe.", correta: true }
                        ]
                    }
                ]
            }
        ]
    },

    ano2: {
        id: "ano2",
        nome: "2º Ano - Calor nas Cidades & Casas Fresquinhas",
        subtitulo: "Construa casas em diferentes biomas e verifique a termodinâmica na prática!",
        corTema: "#d97706",
        badge: "🌡️ Engenheiro de Casas Sustentáveis",
        cenario: "Bairro Comunitário & Canteiro de Obras Térmicas",
        playerSpawn: { x: 4, y: 9 },
        missoes: [
            {
                id: "m2_1",
                titulo: "Fase 1: Por que a rua parece um forno? (Como o calor se espalha)",
                codigoBNCC: "Ilhas de Calor & Modos de Calor",
                npc: "Helena (Arquiteta do Bairro)",
                local: "Praça do Asfalto e das Árvores",
                posTarget: { x: 7, y: 5 },
                icone: "☀️",
                resumo: "Use o termômetro para ver a diferença entre asfalto quente e a sombra das árvores.",
                dialogoNPC: "Já reparou que andar na rua asfaltada no sol do meio-dia parece um forno, enquanto debaixo de uma árvore é gostoso e fresquinho? O calor viaja de 3 jeitos: 1 - Raios invisíveis do Sol que batem em tudo; 2 - Pelo chão e pelas paredes quentes; 3 - Pelo ar quente, que é leve e sobe para o teto da casa!",
                tipo: "simulacao_ilha_calor",
                calcData: {
                    pergunta: "Como o calor do Sol viaja pelo espaço vazio até chegar na Terra e esquentar a nossa cabeça e o asfalto?",
                    unidade: "Jeito do Calor",
                    opcoes: [
                        { valor: "O vento que sopra do espaço", correta: false, explicacao: "No espaço não tem ar nem vento. O calor viaja em forma de raios de sol!" },
                        { valor: "Raios de Sol (Radiação de calor invisível)", correta: true, explicacao: "Certinho! Os raios de calor do Sol viajam pelo espaço mesmo no vácuo até bater no asfalto e nas telhas." },
                        { valor: "Pelo cano de água da rua", correta: false, explicacao: "Não tem a ver com encanamento. O calor do Sol chega em raios de luz invisíveis." }
                    ]
                }
            },
            {
                id: "m2_2",
                titulo: "Fase 2: Jogo de Relacionar - Condução, Convecção ou Radiação?",
                codigoBNCC: "Modos de Propagação do Calor",
                npc: "Profª Sônia (Física Térmica)",
                local: "Laboratório de Termologia",
                posTarget: { x: 11, y: 5 },
                icone: "🔥",
                resumo: "Ligue cada fenômeno da vida real ao modo correto como o calor viaja.",
                dialogoNPC: "O calor nunca fica parado: ele sempre passa de onde está mais quente para onde está mais frio! Conecte as situações do dia a dia com a explicação de Condução, Convecção ou Radiação.",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "t1", ladoA: "Colher de metal esquenta a ponta ao mexer a panela de sopa", ladoB: "Condução: o calor passa de partícula em partícula pelo sólido de metal", parId: 1 },
                    { id: "t2", ladoA: "Sentir o calor do Sol ou de uma fogueira no rosto", ladoB: "Radiação: ondas de calor invisíveis que viajam pelo ar e pelo espaço", parId: 2 },
                    { id: "t3", ladoA: "Ar-condicionado instalado no alto da parede", ladoB: "Convecção: o ar frio é pesado e desce, empurrando o ar quente para cima", parId: 3 },
                    { id: "t4", ladoA: "Água no fundo da chaleira esquenta e sobe girando", ladoB: "Convecção: correntes de água quente que sobem e água fria que desce", parId: 4 }
                ]
            },
            {
                id: "m2_3",
                titulo: "Fase 3: O Segredo da Garrafa Térmica (Vácuo & Espelho)",
                codigoBNCC: "Bloqueio dos 3 Modos de Calor",
                npc: "Profª Sônia (Física Térmica)",
                local: "Bancada da Garrafa Térmica",
                posTarget: { x: 5, y: 11 },
                icone: "🧊",
                resumo: "Veja como uma garrafa térmica barra Condução, Convecção e Radiação ao mesmo tempo.",
                dialogoNPC: "Você já pensou em como a garrafa térmica consegue guardar café fervendo por 12 horas ou água gelada no verão? Ela usa 3 truques de física geniais: 1 - Parede dupla de vidro com VÁCUO (sem ar nenhum, barrando condução e convecção!); 2 - Vidro ESPELHADO prateado (que reflete a radiação de calor de volta); 3 - Tampa isolante vedada!",
                tipo: "simulacao_garrafa_termica",
                calcData: {
                    pergunta: "Por que uma garrafa térmica de boa qualidade possui uma parede dupla com VÁCUO (espaço sem nenhum ar) entre elas?",
                    unidade: "Conceito Físico",
                    opcoes: [
                        { valor: "Porque sem átomos nem ar, o calor não consegue passar por Condução nem por Convecção", correta: true, explicacao: "Exatamente! Condução precisa de sólidos para vibrar e Convecção precisa de fluidos para circular. No vácuo não há matéria, então essas duas formas de calor são 100% bloqueadas!" },
                        { valor: "Para a garrafa ficar leve como uma bexiga", correta: false, explicacao: "O vácuo é usado para isolar termicamente, não para diminuir peso." },
                        { valor: "Para puxar o café para fora automaticamente", correta: false, explicacao: "O vácuo fica lacrado dentro das paredes duplas, sem contato com o café." }
                    ]
                }
            },
            {
                id: "m2_4",
                titulo: "Fase 4: Jogo de Classificar - Bons Condutores vs Bons Isolantes",
                codigoBNCC: "Materiais Isolantes e Condutores",
                npc: "Engº Tiago (Materiais Sustentáveis)",
                local: "Bancada de Materiais",
                posTarget: { x: 13, y: 7 },
                icone: "📦",
                resumo: "Separe os materiais em bons condutores (passam calor) e bons isolantes (barram calor).",
                dialogoNPC: "Para construir uma casa fresca ou fazer uma garrafa térmica, precisamos saber quais materiais deixam o calor passar rápido e quais barram o calor. Separe os 6 materiais nas caixas certas!",
                tipo: "jogo_classificar_materiais",
                itensClassificar: [
                    { id: "m1", nome: "Barra de Alumínio", categoria: "condutor", desc: "Metais transmitem calor super rápido" },
                    { id: "m2", nome: "Placa de Isopor", categoria: "isolante", desc: "Cheio de ar preso, bloqueia a passagem do calor" },
                    { id: "m3", nome: "Caixa de Leite (Lado Prateado)", categoria: "isolante", desc: "Reflete a radiação de calor como um espelho" },
                    { id: "m4", nome: "Panela de Ferro Fundido", categoria: "condutor", desc: "Excelente para cozinhar porque conduz calor fácil" },
                    { id: "m5", nome: "Telha de Zinco / Metal", categoria: "condutor", desc: "Ferve no sol e joga calor para dentro" },
                    { id: "m6", nome: "Cobertor de Lã Grossa", categoria: "isolante", desc: "Impede o calor do corpo de escapar para o frio" }
                ]
            },
            {
                id: "m2_5",
                titulo: "Fase 5: O Poder do Albedo (Cores & Calor no Cotidiano)",
                codigoBNCC: "Reflexão Solar e Efeito Albedo",
                npc: "Helena (Arquiteta do Bairro)",
                local: "Laboratório do Albedo e Cores",
                posTarget: { x: 9, y: 11 },
                icone: "🎨",
                resumo: "Ligue cada situação do cotidiano ao poder das cores de refletir ou absorver o calor.",
                dialogoNPC: "Albedo é a capacidade de uma cor ou superfície de refletir a luz solar em vez de engoli-la! Cores claras têm alto albedo (refletem calor) e cores escuras têm baixo albedo (absorvem calor). Conecte os pares!",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "a1", ladoA: "Camiseta preta no sol forte do meio-dia", ladoB: "Baixo albedo: engole a luz solar, transforma em calor e esquenta o corpo", parId: 1 },
                    { id: "a2", ladoA: "Tinta branca reflexiva pintada no telhado", ladoB: "Alto albedo: reflete a luz solar como um espelho e deixa a casa fresquinha", parId: 2 },
                    { id: "a3", ladoA: "Asfalto preto cobrindo todo o centro da cidade", ladoB: "Cria ilhas de calor: absorve calor o dia todo e solta o bafo quente à noite", parId: 3 },
                    { id: "a4", ladoA: "Calotas polares de gelo e neve nos polos da Terra", ladoB: "Espelho natural gigante: devolve a maior parte do calor do Sol de volta para o espaço", parId: 4 }
                ]
            },
            {
                id: "m2_6",
                titulo: "Fase 6: Simulador de Construção de Casa Térmica (Biomas & Estações)",
                codigoBNCC: "Termodinâmica em Diferentes Biomas e Estações",
                npc: "Engº Tiago (Mestre em Obras)",
                local: "Canteiro de Obras Térmicas",
                posTarget: { x: 15, y: 5 },
                icone: "🏡",
                resumo: "Construa a casa escolhendo bioma, estação, telhado, forro e ventilação!",
                dialogoNPC: "Bem-vindo ao simulador completo! Aqui você pode construir casas no Cerrado, no Sertão Semiárido, no Litoral ou no Sul do país. Teste o comportamento térmico no Verão e no Inverno trocando telhados, mantas de caixa de leite, paredes e janelas para encontrar o conforto térmico sem gastar luz!",
                tipo: "simulacao_casa_biomas"
            },
            {
                id: "m2_7",
                titulo: "Fase 7: Mitos e Fatos da Termologia e do Calor",
                codigoBNCC: "Conceitos Científicos de Temperatura e Calor",
                npc: "Profª Sônia (Física Térmica)",
                local: "Mural de Mitos e Fatos do Calor",
                posTarget: { x: 25, y: 10 },
                icone: "⚖️",
                resumo: "Separe o que é fato físico do que é mito sobre cobertores, geladeiras e ventiladores.",
                dialogoNPC: "Muita gente usa palavras de calor no dia a dia com significado errado! Separe cada frase em FATO COMPROVADO ou MITO POPULAR.",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados pela Termologia",
                subBinA: "Física térmica real",
                tituloBinB: "❌ Mitos Populares do Cotidiano",
                subBinB: "Crenças falsas sobre o calor",
                itensClassificar: [
                    { id: "f1", nome: "O cobertor não produz calor: ele apenas impede o calor do corpo de escapar", categoria: "fato", desc: "Quem produz calor é o nosso metabolismo; a lã é isolante e segura o calor perto da pele." },
                    { id: "m1", nome: "O ventilador diminui a temperatura marcada no termômetro do quarto", categoria: "mito", desc: "O ar continua na mesma temperatura! O vento só ajuda o suor da nossa pele a evaporar mais rápido." },
                    { id: "f2", nome: "Uma colher de metal parece mais fria que uma colher de pau na mesma sala", categoria: "fato", desc: "Ambas estão na mesma temperatura, mas o metal conduz calor da mão muito mais rápido!" },
                    { id: "m2", nome: "Deixar a porta da geladeira aberta serve para refrescar a cozinha", categoria: "mito", desc: "O motor da geladeira esquenta a cozinha por trás muito mais do que a frente esfria!" },
                    { id: "f3", nome: "Pintar o telhado de branco ajuda a economizar energia elétrica na casa", categoria: "fato", desc: "Com a casa fresca naturalmente, diminui a necessidade de ventiladores e ar-condicionado ligados." },
                    { id: "m3", nome: "O ar-condicionado funciona melhor se for instalado colado no chão", categoria: "mito", desc: "O ar frio é pesado e desce; se ficar no chão, o ar quente acumulado no teto nunca é resfriado!" }
                ]
            },
            {
                id: "m2_8",
                titulo: "Fase 8: Complete as Palavras do Conforto Térmico",
                codigoBNCC: "Termos Essenciais de Termodinâmica",
                npc: "Clara (Designer e Urbanista)",
                local: "Mesa de Planejamento",
                posTarget: { x: 17, y: 7 },
                icone: "🧩",
                resumo: "Preencha as palavras que faltam nas frases sobre calor e habitações.",
                dialogoNPC: "Vamos fixar os termos que os engenheiros e arquitetos usam para deixar as casas mais frescas! Encaixe as palavras corretas nas 4 frases.",
                tipo: "jogo_completar",
                lacunasData: {
                    frases: [
                        { pre: "O poder de uma cor clara de refletir a luz solar como um espelho chama-se ", palavra: "ALBEDO", pos: "." },
                        { pre: "A manta de caixas de leite tem alumínio que rebate a ", palavra: "RADIAÇÃO", pos: " de calor da telha." },
                        { pre: "No centro das cidades, o asfalto preto cria as chamadas ", palavra: "ILHAS DE CALOR", pos: "." },
                        { pre: "O ar aquecido se expande, fica mais leve e sobe, gerando a circulação por ", palavra: "CONVECÇÃO", pos: "." }
                    ],
                    bancoPalavras: ["ALBEDO", "RADIAÇÃO", "ILHAS DE CALOR", "CONVECÇÃO", "CONDUÇÃO", "ISOPOR", "INÉRCIA"]
                }
            },
            {
                id: "m2_9",
                titulo: "Fase 9: Ventilação Natural & Efeito Chaminé (Lanternim)",
                codigoBNCC: "Convecção Natural & Arquitetura Sustentável",
                npc: "Engº Tiago (Mestre em Obras)",
                local: "Maquete do Efeito Chaminé e Ventilação",
                posTarget: { x: 23, y: 7 },
                icone: "💨",
                resumo: "Veja como uma abertura no topo do telhado expulsa o ar quente sem gastar luz.",
                dialogoNPC: "Em escolas, galpões e casas populares, podemos refrescar o ambiente sem gastar energia usando o 'Efeito Chaminé'! Como o ar quente se expande e sobe por convecção, colocamos uma abertura protegida no ponto mais alto do telhado (o lanternim). O ar quente sai pelo topo e cria uma sucção que puxa vento fresco pelas janelas de baixo!",
                tipo: "simulacao_ventilacao_chamine",
                calcData: {
                    pergunta: "Por que uma abertura no ponto mais alto do telhado (o lanternim) refresca a casa inteira sem precisar de ventilador?",
                    unidade: "Mecanismo Físico",
                    opcoes: [
                        { valor: "Porque o ar quente sobe por convecção, escapa pelo topo e puxa ar fresco pelas janelas", correta: true, explicacao: "Perfeito! O ar quente é menos denso e sobe naturalmente. Ao sair pelo lanternim, ele cria uma pressão que suga ar fresco por baixo!" },
                        { valor: "Porque o teto puxa o vento da rua feito uma hélice de avião", correta: false, explicacao: "O lanternim não tem partes móveis; funciona puramente pela física da convecção térmica." },
                        { valor: "Porque a abertura atrai nuvens de chuva para cima da casa", correta: false, explicacao: "Não tem relação com chuva; é circulação contínua do ar interno." }
                    ]
                }
            },
            {
                id: "m2_10",
                titulo: "Fase 10: Investigação em Calorimetria (Caixa de Leite Tetra Pak)",
                codigoBNCC: "Trocas de Calor & Economia",
                npc: "Tiago (Técnico de Obras Comunitárias)",
                local: "Oficina de Casas Sustentáveis",
                posTarget: { x: 18, y: 8 },
                icone: "🏠",
                resumo: "Calcule a redução das trocas de calor ao usar o forro prateado.",
                dialogoNPC: "Casas simples com telha de amianto ou fibrocimento esquentam demais porque a telha ferve no sol e joga todo esse calor para dentro do quarto! A solução barata é forrar o teto com caixas de leite abertas (Tetra Pak): aquele lado prateado funciona como um espelho, que rebate o calor do teto de volta para cima!",
                tipo: "simulacao_isolamento",
                calcData: {
                    pergunta: "Sem o forro de caixas de leite, a casa esquentou 12°C acima do normal. Com o forro prateado das caixas de leite, ela esquentou apenas 3°C! Quantas vezes o forro conseguiu diminuir esse esquentamento (12 dividido por 3)?",
                    unidade: "vezes menos calor",
                    opcoes: [
                        { valor: "2 vezes menos calor", correta: false, explicacao: "Faça a divisão: 12 dividido por 3 é igual a 4." },
                        { valor: "15 vezes menos calor", correta: false, explicacao: "Você somou em vez de dividir. 12 ÷ 3 = 4." },
                        { valor: "4 vezes menos calor", correta: true, explicacao: "Sensacional! 12 ÷ 3 = 4. O forro de caixa de leite deixou a casa 4 vezes mais fresca sem precisar gastar um tostão com ar-condicionado!" }
                    ]
                }
            },
            {
                id: "m2_11",
                titulo: "Fase 11: Desafio da Conta de Luz (Calculando a Economia de Energia)",
                codigoBNCC: "Cálculos de Consumo Elétrico & Economia",
                npc: "Dona Maria (Líder Comunitária)",
                local: "Calculadora da Conta de Luz da Comunidade",
                posTarget: { x: 14, y: 13 },
                icone: "⚡",
                resumo: "Calcule quantos reais sobram no orçamento da família ao deixar a casa fresca naturalmente.",
                dialogoNPC: "Conforto térmico também é economia de dinheiro! Quando uma casa é bem ventilada e tem forro reflexivo, a família não precisa deixar aparelhos potentes ligados o dia inteiro. Vamos calcular quanto dinheiro sobra no bolso!",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "Um ar-condicionado gasta cerca de R$ 180 por mês na conta de luz. Com isolamento térmico na casa, a família usa apenas um ventilador de teto que gasta R$ 15 por mês. Quanto a família economiza todo mês ($180 - 15$)?",
                        opcoes: [
                            { valor: "R$ 165 de economia todo mês (dinheiro que sobra para a alimentação!)", correta: true, explicacao: "Perfeito! 180 - 15 = R$ 165 de economia direta na conta de energia todo mês!" },
                            { valor: "R$ 180", correta: false, explicacao: "Subtraia os 15 reais do ventilador." },
                            { valor: "R$ 195", correta: false, explicacao: "Você somou em vez de subtrair." }
                        ]
                    },
                    {
                        q: "Se a família guardar esses R$ 165 de economia todo mês durante 1 ano (12 meses), quanto vai sobrar no total ($165 \times 12$)?",
                        opcoes: [
                            { valor: "R$ 1.980 no ano (quase dois mil reais economizados!)", correta: true, explicacao: "Sensacional! 165 × 12 = R$ 1.980 por ano! É dinheiro que pode ser usado em saúde, material escolar e melhorias na casa!" },
                            { valor: "R$ 1.200 no ano", correta: false, explicacao: "Multiplique 165 por 12." },
                            { valor: "R$ 165 no ano", correta: false, explicacao: "165 é a economia de apenas 1 mês." }
                        ]
                    }
                ]
            },
            {
                id: "m2_12",
                titulo: "Fase 12: A Física do Suor e da Evaporação (Por que o Vento Refresca?)",
                codigoBNCC: "Mudança de Estado & Resfriamento Evaporativo",
                npc: "Profª Sônia (Física Térmica)",
                local: "Bancada de Calorimetria e Fisiologia",
                posTarget: { x: 21, y: 13 },
                icone: "💧",
                resumo: "Conecte os fenômenos da evaporação ao controle natural de temperatura do corpo.",
                dialogoNPC: "Você já reparou que ao sair da piscina molhado, mesmo num dia de calor, você sente um arrepio de frio quando bate o vento? E por que o corpo sua quando praticamos esportes? A resposta está na física: para a água evaporar e virar gás, ela PRECISA 'roubar' calor da nossa pele! O ventilador não gela o ar: ele apenas sopra ar novo para acelerar a evaporação do suor, roubando calor do corpo muito mais rápido! Relacione cada fenômeno com sua explicação física.",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "s1", ladoA: "Gotículas de suor evaporando na pele durante uma corrida", ladoB: "A água líquida rouba calor do corpo para virar vapor, resfriando a temperatura corporal", parId: 1 },
                    { id: "s2", ladoA: "Sentir arrepio de frio ao sair da água da piscina com vento", ladoB: "O vento acelera a evaporação da água sobre a pele, retirando calor de forma brusca", parId: 2 },
                    { id: "s3", ladoA: "Passar álcool no braço e sentir a pele gelada na mesma hora", ladoB: "O álcool evapora muito mais rápido que a água, retirando calor imediato da pele", parId: 3 },
                    { id: "s4", ladoA: "Ligar o ventilador no quarto fechado apontado para uma pessoa", ladoB: "O vento retira a camada de ar úmido ao redor do corpo, acelerando a perda de calor", parId: 4 }
                ]
            },
            {
                id: "m2_13",
                titulo: "Fase 13: O Efeito Estufa no Carro Fechado no Sol (O Perigo dos 60°C)",
                codigoBNCC: "Radiação Solar & Efeito Estufa Veicular",
                npc: "Helena (Arquiteta do Bairro)",
                local: "Estacionamento Comunitário de Testes",
                posTarget: { x: 5, y: 14 },
                icone: "🚗",
                resumo: "Calcule como o calor fica preso dentro de um veículo fechado no sol e entenda o efeito estufa.",
                dialogoNPC: "Nunca deixe crianças ou animais de estimação sozinhos dentro de um carro fechado no sol, nem por 5 minutos! O vidro do carro deixa a luz do Sol (luz visível) entrar livremente. Ao bater nos bancos escuros e no painel, a luz é absorvida e reemitida como RADIAÇÃO INFRAVERMELHA (calor)! O vidro é transparente para a luz, mas é quase OPACO para o calor: o calor fica aprisionado lá dentro! A temperatura sobe a níveis fatais de 60°C. Vamos calcular essa armadilha térmica.",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "Lá fora na rua a temperatura é de 30°C. Sob o sol forte, o efeito estufa dentro do carro fechado dobra a temperatura ambiente em apenas 20 minutos ($30 \\times 2$). Qual é a temperatura do ar dentro do carro?",
                        opcoes: [
                            { valor: "60°C (temperatura extrema que desidrata e causa insolação fatal em minutos!)", correta: true, explicacao: "Exatamente! 30 × 2 = 60°C! O interior do carro vira um verdadeiro forno devido ao aprisionamento da radiação infravermelha pelo vidro!" },
                            { valor: "30°C (a temperatura dentro é sempre igual à de fora)", correta: false, explicacao: "O vidro aprisiona a radiação térmica, fazendo o calor acumular continuamente." },
                            { valor: "40°C", correta: false, explicacao: "Dobre 30°C." }
                        ]
                    },
                    {
                        q: "Se o motorista usar um protetor solar prateado refletivo no para-brisa, ele rebate 80% dos raios de sol de volta. A temperatura interna sobe apenas 5°C acima da externa ($30 + 5$). Quanto marcará o termômetro agora?",
                        opcoes: [
                            { valor: "35°C (o reflexo prateado impediu a formação do forno térmico interno!)", correta: true, explicacao: "Sensacional! 30 + 5 = 35°C. O alumínio reflexivo bloqueou a entrada de luz, impedindo que ela se transformasse em calor preso!" },
                            { valor: "60°C", correta: false, explicacao: "O protetor refletivo barra a maior parte do calor." },
                            { valor: "25°C", correta: false, explicacao: "Some 30 com 5." }
                        ]
                    }
                ]
            },
            {
                id: "m2_14",
                titulo: "Fase 14: Inércia Térmica (Paredes de Adobe e Tijolo Ecológico)",
                codigoBNCC: "Capacidade Térmica & Inércia Térmica na Habitação",
                npc: "Engº Tiago (Mestre em Obras)",
                local: "Canteiro de Alvenaria Ecológica",
                posTarget: { x: 26, y: 7 },
                icone: "🧱",
                resumo: "Classifique o que é fato e o que é mito sobre a inércia térmica e a espessura das paredes.",
                dialogoNPC: "Você já entrou em uma igreja histórica antiga ou numa casa de taipa/adobe no sertão e sentiu como ela é fresquinha durante a tarde e quentinha à noite? Isso chama-se INÉRCIA TÉRMICA! Materiais pesados e grossos demoram muitas horas para absorver o calor do meio-dia (atraso térmico); quando o calor finalmente atravessa a parede, já é noite fria, e ele ajuda a aquecer o quarto! Separe os fatos dos mitos da alvenaria ecológica.",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados da Inércia Térmica",
                subBinA: "Propriedades térmicas reais das construções",
                tituloBinB: "❌ Mitos Populares da Construção",
                subBinB: "Crenças erradas sobre paredes e calor",
                itensClassificar: [
                    { id: "f1", nome: "Paredes grossas de tijolo ecológico ou adobe demoram horas para deixar o calor atravessar", categoria: "fato", desc: "Alta capacidade térmica garante atraso térmico, mantendo o interior estável o dia todo." },
                    { id: "m1", nome: "Parede fininha de lata de metal é melhor porque esfria no segundo em que o sol se põe", categoria: "mito", desc: "Lata ferve a 50°C no meio do dia e transforma a casa numa estufa inabitável!" },
                    { id: "f2", nome: "A inércia térmica funciona como uma 'bateria' que armazena calor de dia e solta à noite", categoria: "fato", desc: "Em regiões com grande variação entre dia e noite (semiárido e cerrado), isso economiza 100% de luz!" },
                    { id: "m2", nome: "Ar-condicionado gasta a mesma energia em qualquer casa, não importa o tipo de parede", categoria: "mito", desc: "Em casas com alta inércia térmica e forro isolante, o aparelho quase não precisa ligar o motor!" },
                    { id: "f3", nome: "Plantar árvores e trepadeiras nas paredes ensolaradas cria uma barreira viva contra o sol", categoria: "fato", desc: "A sombra das folhas impede a radiação direta de tocar a parede, barrando o aquecimento." },
                    { id: "m3", nome: "Paredes pretas pintadas por fora deixam a casa mais arejada", categoria: "mito", desc: "Cores escuras engolem 90% da luz solar e transferem todo o calor para dentro!" }
                ]
            },
            {
                id: "m2_15",
                titulo: "Fase 15: Escrevendo o Mapa Mental no seu Caderno Escolar",
                codigoBNCC: "Atividade Prática no Caderno Escolar",
                npc: "Profª Sônia & Arq. Helena",
                local: "Bancada de Projetos Sustentáveis",
                posTarget: { x: 19, y: 10 },
                icone: "✏️",
                resumo: "Abra o seu caderno real e registre o mapa mental completo de termologia e habitações!",
                dialogoNPC: "Abra o seu caderno de física em uma página limpa! Vamos organizar todas as descobertas sobre calor, materiais, biomas e economia de energia em um Mapa Mental completo no seu caderno escolar.",
                tipo: "maker_mapa_mental",
                centroMapa: {
                    titulo: "TERMODINÂMICA & CONFORTO NAS CASAS",
                    subtitulo: "2º Ano do Ensino Médio • 4º Bimestre",
                    icone: "🏡",
                    cor: "#ea580c"
                },
                ramosMapaMental: [
                    {
                        id: "r1",
                        numero: "1",
                        tag: "RAMO 1",
                        icone: "🔥",
                        nome: "Os 3 Modos de Transferência de Calor",
                        dicaDesenho: "Canto Superior Esquerdo",
                        cor: "#ea580c",
                        itens: [
                            "Condução: calor passa átomo por átomo pelos sólidos (metais esquentam rápido)",
                            "Convecção: ar quente se expande, fica leve e sobe; ar frio mais denso desce",
                            "Radiação: raios de calor invisíveis que viajam pelo ar e pelo vácuo do espaço"
                        ]
                    },
                    {
                        id: "r2",
                        numero: "2",
                        tag: "RAMO 2",
                        icone: "🧱",
                        nome: "Materiais da Construção (Condutores vs Isolantes)",
                        dicaDesenho: "Canto Superior Direito",
                        cor: "#2563eb",
                        itens: [
                            "Bons Condutores: telhas de zinco e ferro fervem no sol e jogam calor para dentro",
                            "Bons Isolantes: isopor, lã e madeira barram e retardam a passagem do calor",
                            "Efeito Espelho: o alumínio da caixa de leite Tetra Pak reflete 95% do calor do teto"
                        ]
                    },
                    {
                        id: "r3",
                        numero: "3",
                        tag: "RAMO 3",
                        icone: "🌍",
                        nome: "Biomas & Estratégias Passivas de Conforto",
                        dicaDesenho: "Canto Inferior Esquerdo",
                        cor: "#15803d",
                        itens: [
                            "Cerrado e Sertão: sol escaldante exige telhado branco reflexivo (alto albedo) e forro",
                            "Ventilação Cruzada: janelas em paredes opostas criam correnteza que expulsa o calor",
                            "Lanternim: abertura no ponto mais alto do telhado para o ar quente que subiu escapar"
                        ]
                    },
                    {
                        id: "r4",
                        numero: "4",
                        tag: "RAMO 4",
                        icone: "💡",
                        nome: "Economia na Conta de Luz & Saúde",
                        dicaDesenho: "Canto Inferior Direito",
                        cor: "#7c3aed",
                        itens: [
                            "Casa fresca naturalmente diminui horas de ventilador e ar-condicionado no máximo",
                            "Menos gasto na conta de luz gera sobra de orçamento para a alimentação da família",
                            "Arborização Urbana: árvores na calçada reduzem até 4°C no calor do quarteirão"
                        ]
                    }
                ]
            },
            {
                id: "m2_16",
                titulo: "Fase 16: Criando o Post para as Redes da Comunidade",
                codigoBNCC: "Dicas de Conforto Térmico",
                npc: "Clara (Designer do Bairro)",
                local: "Sala de Criação Visual",
                posTarget: { x: 21, y: 11 },
                icone: "🎨",
                resumo: "Monte um post com 3 dicas fáceis para deixar a casa fresca no verão.",
                dialogoNPC: "Vamos ensinar a vizinhança a deixar a casa fresquinha sem tomar susto na conta de luz! Selecione 3 soluções práticas e comprovadas para o post das redes sociais.",
                tipo: "maker_pixel_art",
                cardsSolucao: [
                    { id: "p1", solucao: "Manta no teto com caixas de leite vazias", justificativa: "A parte prateada funciona como um espelho de calor, rebatendo o calor da telha para fora.", valido: true },
                    { id: "e1", solucao: "Pintar as paredes da casa de preto fosco", justificativa: "Cores escuras engolem o calor do sol e transformam a casa numa estufa sufocante!", valido: false },
                    { id: "p2", solucao: "Abrir janelas em paredes opostas (vento cruzado)", justificativa: "O vento fresco entra por um lado e empurra o ar quente que subiu para fora da casa.", valido: true },
                    { id: "p3", solucao: "Pintar o telhado de branco ou plantar mudas na calçada", justificativa: "A cor branca reflete a luz do sol e a sombra das folhas alivia o calor da calçada.", valido: true }
                ]
            },
            {
                id: "m2_17",
                titulo: "Fase 17: Perguntas Finais do Conselho de Moradores",
                codigoBNCC: "Avaliação do Bimestre",
                npc: "Conselho Comunitário do Bairro",
                local: "Centro de Convivência",
                posTarget: { x: 10, y: 14 },
                icone: "🏆",
                resumo: "Defenda as soluções para economizar energia e melhorar o conforto das famílias.",
                dialogoNPC: "Os líderes comunitários estão reunidos para ouvir suas dicas. Responda com clareza para garantir a nota bimestral do seu grupo!",
                tipo: "banca_defesa",
                perguntasBanca: [
                    {
                        pergunta: "Por que pintar o telhado de branco deixa a casa muito mais fresca do que pintar de cor escura?",
                        respostas: [
                            { txt: "Porque a tinta branca atrai vento frio para a casa.", correta: false },
                            { txt: "Porque o branco reflete a maior parte dos raios de sol, enquanto cores escuras engolem o calor.", correta: true },
                            { txt: "Porque o branco é uma cor que apaga a luz do sol.", correta: false }
                        ]
                    },
                    {
                        pergunta: "Como o forro isolante no teto ajuda a família a pagar menos na conta de energia?",
                        respostas: [
                            { txt: "Com a casa mais fresca por natureza, a família não precisa deixar ventiladores ou ar-condicionado ligados o dia todo no máximo.", correta: true },
                            { txt: "Porque o forro desliga o relógio de luz da rua.", correta: false },
                            { txt: "Porque o forro produz energia elétrica de graça para a casa.", correta: false }
                        ]
                    },
                    {
                        pergunta: "Por que o ar quente sempre sobe e fica acumulado lá perto do teto?",
                        respostas: [
                            { txt: "Porque a gravidade só puxa o ar frio para baixo.", correta: false },
                            { txt: "Porque quando o ar esquenta ele se expande, fica mais leve que o ar frio e sobe naturalmente.", correta: true },
                            { txt: "Porque o teto puxa o ar quente como se fosse um ímã.", correta: false }
                        ]
                    }
                ]
            }
        ]
    },

    ano3: {
        id: "ano3",
        nome: "3º Ano - Celular, Wi-Fi, 5G & Tech-Cast",
        subtitulo: "Desvende os mitos das ondas e grave um episódio de podcast de sucesso!",
        corTema: "#7c3aed",
        badge: "📡 Especialista em Ondas & Podcast",
        cenario: "Mirante das Antenas & Estúdio de Som",
        playerSpawn: { x: 4, y: 9 },
        missoes: [
            {
                id: "m3_1",
                titulo: "Fase 1: O 5G ou o Wi-Fi fazem mal à saúde? (Desmentindo mitos)",
                codigoBNCC: "Radiação Segura vs Perigosa",
                npc: "Nicole (Engenheira de Redes)",
                local: "Mirante da Torre de Antenas",
                posTarget: { x: 6, y: 4 },
                icone: "📱",
                resumo: "Entenda a diferença entre ondas seguras (celular/Wi-Fi) e radiação perigosa (raios-X).",
                dialogoNPC: "Muita gente inventa histórias na internet dizendo que o sinal de 5G ou Wi-Fi dá doença. Vamos entender de forma bem simples: existem ondas perigosas com força para arrancar pedaços das nossas células (como raios-X de hospital, por isso usamos avental de chumbo lá!), e ondas fracas e 100% seguras (como o rádio do carro, a luz da lâmpada, o Wi-Fi e o 5G), que só viajam pelo ar levando mensagens e vídeos sem machucar ninguém!",
                tipo: "simulacao_espectro",
                calcData: {
                    pergunta: "Qual das opções abaixo é a radiação forte e perigosa que exige proteção de chumbo e cuidado médico?",
                    unidade: "Tipo de Radiação",
                    opcoes: [
                        { valor: "Roteador de Wi-Fi da sala", correta: false, explicacao: "O Wi-Fi utiliza ondas de rádio super fracas, totalmente seguras para a família." },
                        { valor: "Raios-X de hospital e usinas nucleares", correta: true, explicacao: "Exatamente! Raios-X e radiação nuclear têm energia para quebrar moléculas. Já o sinal do celular e o Wi-Fi são inofensivos e seguros." },
                        { valor: "Sinal de internet 5G do celular", correta: false, explicacao: "O 5G é onda de rádio fraca e segura, sem força para mexer nas nossas células." }
                    ]
                }
            },
            {
                id: "m3_2",
                titulo: "Fase 2: Jogo de Relacionar - As Ondas do Nosso Dia a Dia",
                codigoBNCC: "O Espectro e as Tecnologias",
                npc: "Lucas (Técnico de Rádio e Antenas)",
                local: "Base das Antenas",
                posTarget: { x: 10, y: 5 },
                icone: "🔗",
                resumo: "Conecte cada tecnologia ao tipo de onda que ela emite no cotidiano.",
                dialogoNPC: "Estamos cercados de ondas invisíveis o tempo todo! Algumas trazem filmes para a TV, outras aquecem comida e outras levam mensagens para o WhatsApp. Ligue cada aparelho à sua onda correspondente!",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "o1", ladoA: "Roteador Wi-Fi e Antena de 5G", ladoB: "Micro-ondas de rádio não ionizantes que carregam dados de internet", parId: 1 },
                    { id: "o2", ladoA: "Controle remoto da televisão", ladoB: "Raios infravermelhos invisíveis que mandam comandos para a tela", parId: 2 },
                    { id: "o3", ladoA: "Aparelho de Raio-X do hospital", ladoB: "Radiação ionizante de alta energia que atravessa tecidos moles", parId: 3 },
                    { id: "o4", ladoA: "Lâmpada acesa no teto da sala", ladoB: "Luz visível que os nossos olhos conseguem enxergar", parId: 4 }
                ]
            },
            {
                id: "m3_3",
                titulo: "Fase 3: Como as ondas viajam? (O tamanho da antena do celular)",
                codigoBNCC: "Ondas e Tamanho de Antenas",
                npc: "Lucas (Técnico de Rádio e Antenas)",
                local: "Base da Antena Transmissora",
                posTarget: { x: 14, y: 5 },
                icone: "📻",
                resumo: "Descubra por que a antena do seu celular é tão pequenininha e fica escondida.",
                dialogoNPC: "As ondas do celular viajam na velocidade da luz pelo ar (300 mil quilômetros por segundo!). A regra é simples: ondas de internet rápida como o 5G são ondas 'curtinhas' (de poucos centímetros). Como a onda é curtinha, a antena para captar esse sinal é minúscula e cabe escondida dentro do seu celular! Já o rádio antigo tinha ondas compridas de metros, por isso precisava daquela antena de metal no carro.",
                tipo: "simulacao_antena",
                calcData: {
                    pergunta: "Um sinal de 5G tem uma onda curtinha de 10 centímetros. A anteninha de dentro do celular só precisa ter um quarto desse tamanho (10 centímetros dividido por 4). De quantos centímetros deve ser essa anteninha?",
                    unidade: "centímetros",
                    opcoes: [
                        { valor: "40 cm", correta: false, explicacao: "Você multiplicou em vez de dividir. 10 dividido por 4 é igual a 2,5." },
                        { valor: "2,5 cm (cabe dentro do celular!)", correta: true, explicacao: "Perfeito! 10 ÷ 4 = 2,5 cm. Uma anteninha de apenas 2,5 cm já capta a internet do 5G perfeitamente dentro do aparelho!" },
                        { valor: "10 cm", correta: false, explicacao: "Como a antena é de 1/4 da onda, divida 10 por 4." }
                    ]
                }
            },
            {
                id: "m3_4",
                titulo: "Fase 4: Escrevendo o Mapa Mental no seu Caderno Escolar",
                codigoBNCC: "Atividade Prática no Caderno Escolar",
                npc: "Prof. Lucas & Dra. Nicole",
                local: "Bancada de Desenho & Telecom",
                posTarget: { x: 8, y: 11 },
                icone: "✏️",
                resumo: "Abra o seu caderno real e registre o mapa mental completo de ondas e telecomunicações!",
                dialogoNPC: "Abra o seu caderno em uma página limpa! Vamos desenhar um lindo Mapa Mental organizando toda a física das ondas, frequências, espectro seguro e a transmissão dos celulares.",
                tipo: "maker_mapa_mental",
                centroMapa: {
                    titulo: "ONDAS, ESPECTRO & TELECOMUNICAÇÕES",
                    subtitulo: "3º Ano do Ensino Médio • 4º Bimestre",
                    icone: "📡",
                    cor: "#7c3aed"
                },
                ramosMapaMental: [
                    {
                        id: "r1",
                        numero: "1",
                        tag: "RAMO 1",
                        icone: "🔊",
                        nome: "Ondas Mecânicas (Som) vs Eletromagnéticas (Wi-Fi/Luz)",
                        dicaDesenho: "Canto Superior Esquerdo",
                        cor: "#2563eb",
                        itens: [
                            "Som precisa de matéria e ar para vibrar (no vácuo do espaço não existe som!)",
                            "Ondas de Wi-Fi, luz e celular viajam pelo vácuo na velocidade da luz (300 mil km/s)",
                            "A velocidade do som no ar é 340 m/s; a luz é quase 1 milhão de vezes mais rápida"
                        ]
                    },
                    {
                        id: "r2",
                        numero: "2",
                        tag: "RAMO 2",
                        icone: "🛡️",
                        nome: "Radiação Não Ionizante (Segura) vs Ionizante (Perigosa)",
                        dicaDesenho: "Canto Superior Direito",
                        cor: "#d97706",
                        itens: [
                            "Ondas Seguras: rádio, Wi-Fi, 5G e lâmpadas são fracas e não arrancam elétrons do DNA",
                            "Radiação Forte: raios-X e radiação nuclear quebram moléculas e exigem chumbo",
                            "Mitos do 5G: sinais de antena são apenas ondas de rádio e não transmitem doenças"
                        ]
                    },
                    {
                        id: "r3",
                        numero: "3",
                        tag: "RAMO 3",
                        icone: "📶",
                        nome: "Frequência, Comprimento & Antenas",
                        dicaDesenho: "Canto Inferior Esquerdo",
                        cor: "#15803d",
                        itens: [
                            "Quanto maior a frequência da internet, mais curtinha é a onda no ar",
                            "Ondas curtinhas de 5G usam antenas minúsculas (2,5 cm) embutidas no celular",
                            "Banda 5 GHz é ultrarrápida perto; banda 2.4 GHz atravessa paredes com facilidade"
                        ]
                    },
                    {
                        id: "r4",
                        numero: "4",
                        tag: "RAMO 4",
                        icone: "🎙️",
                        nome: "Produção Sonora & Tech-Cast",
                        dicaDesenho: "Canto Inferior Direito",
                        cor: "#7c3aed",
                        itens: [
                            "Frequência do Som: graves (vibração lenta) vs agudos (vibração ultra rápida)",
                            "Amplitude: altura da crista da onda sonora determina o volume do áudio",
                            "Tratamento de Áudio: filtros digitais removem chiados e eco do microfone"
                        ]
                    }
                ]
            },
            {
                id: "m3_5",
                titulo: "Fase 5: O Experimento do Vácuo (Som vs Luz e Wi-Fi)",
                codigoBNCC: "Natureza das Ondas no Vácuo",
                npc: "Prof. Lucas (Laboratório de Ondas)",
                local: "Campânula de Vácuo do Laboratório",
                posTarget: { x: 22, y: 6 },
                icone: "🔔",
                resumo: "Ligue a bomba de vácuo para ver o som sumir enquanto a luz e o Wi-Fi continuam ativos!",
                dialogoNPC: "O que acontece se colocarmos um alarme tocando e uma lâmpada acesa dentro de um pote de vidro e tirarmos todo o ar? Ligue a bomba de vácuo para comprovar uma das regras mais fundamentais do universo!",
                tipo: "simulacao_vacuo_som_luz",
                calcData: {
                    pergunta: "Quando a bomba de vácuo retirou todo o ar de dentro do pote de vidro, por que o SOM do alarme parou de ser ouvido, mas a LUZ da lâmpada continuou brilhando normalmente?",
                    unidade: "Diferença Física",
                    opcoes: [
                        { valor: "Porque o som é onda mecânica e precisa de ar para vibrar, enquanto a luz é onda eletromagnética e viaja no vácuo", correta: true, explicacao: "Perfeito! O som precisa de moléculas colidindo para viajar. Sem ar no vácuo, não há como o som se propagar! Já a luz e o Wi-Fi não precisam de ar nenhum!" },
                        { valor: "Porque o vácuo descarregou a pilha do alarme", correta: false, explicacao: "O alarme continuou tocando fisicamente, mas sem ar a vibração não chega ao nosso ouvido." },
                        { valor: "Porque a luz é mais pesada que o som", correta: false, explicacao: "Luz e som têm naturezas ondulatórias totalmente distintas." }
                    ]
                }
            },
            {
                id: "m3_6",
                titulo: "Fase 6: Complete as Palavras das Telecomunicações",
                codigoBNCC: "Termos Fundamentais de Ondulatória",
                npc: "Dra. Nicole (Engª de Telecomunicações)",
                local: "Mirante da Transmissão",
                posTarget: { x: 16, y: 7 },
                icone: "🧩",
                resumo: "Complete as lacunas sobre a velocidade da luz, ondas e segurança digital.",
                dialogoNPC: "Vamos conferir se você já domina os termos dos cientistas de telecomunicações! Preencha as 4 lacunas com os termos do banco de palavras.",
                tipo: "jogo_completar",
                lacunasData: {
                    frases: [
                        { pre: "Todas as ondas de Wi-Fi e celular viajam no ar na ", palavra: "VELOCIDADE DA LUZ", pos: " (300 mil km/s)." },
                        { pre: "O sinal de celular e Wi-Fi é ", palavra: "NÃO IONIZANTE", pos: ", ou seja, não tem força para quebrar nosso DNA." },
                        { pre: "Quanto mais alta é a ", palavra: "FREQUÊNCIA", pos: " da internet, mais curtinha é a onda e menor é a antena necessária." },
                        { pre: "O som da nossa voz precisa do ", palavra: "AR", pos: " para vibrar, enquanto as ondas de rádio viajam até no espaço vazio." }
                    ],
                    bancoPalavras: ["VELOCIDADE DA LUZ", "NÃO IONIZANTE", "FREQUÊNCIA", "AR", "RADIAÇÃO NUCLEAR", "ISOPOR", "VELOCIDADE DO SOM"]
                }
            },
            {
                id: "m3_7",
                titulo: "Fase 7: Mitos e Fatos sobre 5G, Celular e Radiações",
                codigoBNCC: "Desmistificação Científica das Telecomunicações",
                npc: "Dra. Nicole (Engª de Telecomunicações)",
                local: "Mural de Mitos e Radiações",
                posTarget: { x: 24, y: 9 },
                icone: "⚖️",
                resumo: "Separe os boatos falsos da internet das verdades comprovadas pela física.",
                dialogoNPC: "Na internet circulam muitas fake news sobre antenas de celular e redes sem fio. Ajude a comunidade separando os FATOS COMPROVADOS dos MITOS INFUNDADOS!",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados da Física",
                subBinA: "Propriedades reais das ondas",
                tituloBinB: "❌ Mitos e Fake News da Internet",
                subBinB: "Boatos infundados sobre sinais de rede",
                itensClassificar: [
                    { id: "f1", nome: "Wi-Fi e 5G emitem radiação não ionizante, incapaz de quebrar o DNA humano", categoria: "fato", desc: "A energia das micro-ondas de rádio é milhões de vezes mais fraca que a de um raio-X." },
                    { id: "m1", nome: "Torres de celular e antenas de 5G transmitem vírus de gripe pelo ar", categoria: "mito", desc: "Vírus são agentes biológicos; ondas de rádio são oscilações eletromagnéticas que só carregam dados." },
                    { id: "f2", nome: "Ouvir música com fone no volume máximo destrói as células ciliadas do ouvido", categoria: "fato", desc: "A pressão mecânica excessiva quebra as células auditivas, causando perda irreversível." },
                    { id: "m2", nome: "O micro-ondas da cozinha deixa a comida radioativa e tóxica", categoria: "mito", desc: "O aparelho só agita as moléculas de água do alimento para aquecer; desligou, a onda cessa." },
                    { id: "f3", nome: "Todas as ondas de rádio, Wi-Fi e celular viajam no ar na velocidade da luz (300.000 km/s)", categoria: "fato", desc: "São todas formas de radiação eletromagnética, variando apenas o tamanho da onda e a frequência." },
                    { id: "m3", nome: "Dormir com o celular no criado-mudo causa mutações genéticas no cérebro", categoria: "mito", desc: "O sinal de celular tem baixa potência de rádio e não tem energia física para alterar genes." }
                ]
            },
            {
                id: "m3_8",
                titulo: "Fase 8: O Duelo de Wi-Fi - 2.4 GHz vs 5.0 GHz nas Paredes da Casa",
                codigoBNCC: "Penetração de Ondas e Obstáculos",
                npc: "Marcos (Técnico de Redes Domésticas)",
                local: "Casa de Teste de Sinal Wi-Fi",
                posTarget: { x: 18, y: 7 },
                icone: "📶",
                resumo: "Veja por que o 5 GHz é ultrarrápido perto, mas o 2.4 GHz atravessa paredes melhor!",
                dialogoNPC: "No roteador da sua casa sempre aparecem duas redes: 2.4 GHz e 5.0 GHz! Você sabe quando usar cada uma? O 5 GHz tem ondas curtinhas super velozes, mas sofre para furar paredes de tijolo. Já o 2.4 GHz é mais longo e atravessa a casa toda! Teste você mesmo nos cômodos!",
                tipo: "simulacao_wifi_comodos"
            },
            {
                id: "m3_9",
                titulo: "Fase 9: A Física da Música e do Som (Graves, Agudos & Volume)",
                codigoBNCC: "Propriedades das Ondas Sonoras no Estúdio",
                npc: "Júlia (Produtora do Estúdio de Som)",
                local: "Mesa de Mixagem Musical",
                posTarget: { x: 14, y: 12 },
                icone: "🎶",
                resumo: "Conecte os conceitos de frequência, amplitude e timbre ao trabalho de gravação musical.",
                dialogoNPC: "No estúdio de som, a física das ondas vira música! Ligue cada conceito ondulatório ao seu efeito prático na produção do podcast.",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "m1", ladoA: "Som Grave (baixa frequência)", ladoB: "Vibrações lentas e ondas sonoras longas como o bumbo da bateria e o contrabaixo", parId: 1 },
                    { id: "m2", ladoA: "Som Agudo (alta frequência)", ladoB: "Vibrações ultra rápidas e ondas curtinhas como o apito, o violino e os pratos", parId: 2 },
                    { id: "m3", ladoA: "Amplitude da onda sonora", ladoB: "Determina o volume e a potência do áudio: crista alta = som forte; crista baixa = suave", parId: 3 },
                    { id: "m4", ladoA: "Eco e reverberação no estúdio", ladoB: "Reflexão da onda de som nas paredes lisas que volta com atraso até o microfone", parId: 4 }
                ]
            },
            {
                id: "m3_10",
                titulo: "Fase 10: O Laboratório do Roteador Ideal (Onde Instalar o Wi-Fi?)",
                codigoBNCC: "Propagação Eletromagnética e Obstáculos",
                npc: "Marcos (Técnico de Redes Domésticas)",
                local: "Laboratório de Posicionamento do Roteador",
                posTarget: { x: 18, y: 13 },
                icone: "📡",
                resumo: "Teste 3 posições do roteador na planta da casa para obter cobertura máxima sem pontos cegos.",
                dialogoNPC: "Muita gente reclama que a internet é lenta, mas colocou o roteador dentro do guarda-roupa ou atrás da TV de metal! Teste as 3 posições na planta baixa e descubra o local ideal para propagação das ondas.",
                tipo: "simulacao_posicionamento_wifi",
                calcData: {
                    pergunta: "Por que colocar o roteador no alto (a cerca de 1,80 m) e no cômodo central da casa é o melhor lugar para ter sinal forte em todos os quartos?",
                    unidade: "Regra de Propagação",
                    opcoes: [
                        { valor: "Porque as ondas se propagam em todas as direções e passam por cima dos móveis sem bater no chão", correta: true, explicacao: "Perfeito! No alto e no centro, as ondas sofrem muito menos bloqueio de sofás, chão e paredes metálicas, cobrindo a casa inteira!" },
                        { valor: "Porque no teto o roteador fica mais perto dos satélites no espaço", correta: false, explicacao: "O roteador doméstico se conecta via cabo de fibra óptica na parede, não via satélite." },
                        { valor: "Porque no alto o ar é mais gelado e faz a internet correr mais rápido", correta: false, explicacao: "A velocidade da onda no ar é sempre a mesma (velocidade da luz); o que muda é a ausência de obstáculos." }
                    ]
                }
            },
            {
                id: "m3_11",
                titulo: "Fase 11: A Física do Relâmpago e do Trovão (A Luz vs O Som)",
                codigoBNCC: "Velocidade da Luz (300.000 km/s) vs Velocidade do Som (340 m/s)",
                npc: "Prof. Lucas (Laboratório de Ondas)",
                local: "Mirante dos Céus e Tempestades",
                posTarget: { x: 26, y: 4 },
                icone: "⚡",
                resumo: "Calcule a distância de uma tempestade contando os segundos entre o clarão e o trovão!",
                dialogoNPC: "Por que numa tempestade sempre vemos primeiro o clarão do raio e só depois ouvimos o estrondo do trovão? Porque o raio e o trovão acontecem no MESMO instante! Mas a luz viaja a incríveis 300.000 km/s (chega aos seus olhos instantaneamente), enquanto o som viaja no ar a apenas 340 metros por segundo (leva cerca de 3 segundos para andar 1 quilômetro!). Vamos calcular a quantos quilômetros o raio caiu usando a 'Regra dos Segundos'!",
                tipo: "quiz_calculos_transito",
                perguntasQuiz: [
                    {
                        q: "Você vê o clarão do raio e conta: 1, 2, 3, 4, 5, 6 segundos até ouvir o estrondo do trovão! Como o som percorre 1 quilômetro a cada 3 segundos, basta dividir 6 por 3 ($6 \\div 3$). A quantos quilômetros de distância o raio caiu?",
                        opcoes: [
                            { valor: "2 quilômetros de distância (dá tempo de se abrigar em segurança!)", correta: true, explicacao: "Perfeito! 6 ÷ 3 = 2 quilômetros! Como o som leva 3 segundos para andar 1 km no ar, 6 segundos significam que o raio caiu a exatos 2 km de você!" },
                            { valor: "6 quilômetros", correta: false, explicacao: "Divida os 6 segundos por 3 segundos por km." },
                            { valor: "18 quilômetros", correta: false, explicacao: "Você multiplicou em vez de dividir. 6 ÷ 3 = 2 km." }
                        ]
                    },
                    {
                        q: "Se o raio cair super perto e o trovão for ouvido em apenas 3 segundos ($3 \\div 3$), a que distância ele caiu?",
                        opcoes: [
                            { valor: "1 quilômetro de distância (atenção: a tempestade está muito perto!)", correta: true, explicacao: "Exatamente! 3 ÷ 3 = 1 km. Se você ouvir o trovão logo em seguida do clarão, a tempestade está em cima de você!" },
                            { valor: "3 quilômetros", correta: false, explicacao: "3 dividido por 3 é igual a 1." },
                            { valor: "10 quilômetros", correta: false, explicacao: "Divida 3 por 3." }
                        ]
                    }
                ]
            },
            {
                id: "m3_12",
                titulo: "Fase 12: Isolamento Acústico do Estúdio (Espumas & Vidros Duplos)",
                codigoBNCC: "Reflexão, Absorção e Transmissão de Ondas Sonoras",
                npc: "Júlia (Produtora do Estúdio de Som)",
                local: "Sala de Gravação e Isolamento Acústico",
                posTarget: { x: 22, y: 11 },
                icone: "🎙️",
                resumo: "Conecte os materiais do estúdio às propriedades de reflexão, absorção e cancelamento do som.",
                dialogoNPC: "Para gravar o podcast com qualidade profissional de rádio, não podemos ter ruídos de motos da rua nem eco dentro da sala! A física acústica resolve isso com três princípios: 1 - Absorção (materiais fofos que engolem a onda sonora); 2 - Difusão (formatos irregulares que espalham a onda); 3 - Barreiras de ar (vidro duplo que quebra a condução do som mecânico). Ligue cada elemento à sua função física!",
                tipo: "jogo_relacionar",
                paresRelacionar: [
                    { id: "a1", ladoA: "Espuma perfilada em formato de caixa de ovos nas paredes", ladoB: "As ondas de som entram nos cones, ricocheteiam e perdem energia sem refletir eco", parId: 1 },
                    { id: "a2", ladoA: "Janela com vidro duplo e uma câmara de ar vedada no meio", ladoB: "O som da rua vibra o primeiro vidro, mas perde força no bolsão de ar antes do segundo", parId: 2 },
                    { id: "a3", ladoA: "Filtro anti-pop de tecido fino na frente do microfone", ladoB: "Dissipa a rajada de vento mecânico das letras P e B, captando apenas a onda da voz", parId: 3 },
                    { id: "a4", ladoA: "Porta pesada de madeira maciça com vedação de borracha nas bordas", ladoB: "Impede frestas de ar por onde as ondas sonoras mecânicas poderiam vazar para fora", parId: 4 }
                ]
            },
            {
                id: "m3_13",
                titulo: "Fase 13: Fibras Ópticas e a Luz Laser (A Internet nos Oceanos)",
                codigoBNCC: "Reflexão Total Interna, Luz Laser & Cabos Submarinos",
                npc: "Nicole (Engenheira de Redes)",
                local: "Bancada dos Cabos de Fibra Submarinos",
                posTarget: { x: 12, y: 6 },
                icone: "💡",
                resumo: "Classifique o que é fato e o que é mito sobre como a internet mundial viaja na velocidade da luz.",
                dialogoNPC: "Como vídeos do YouTube e mensagens do WhatsApp chegam de outros continentes até você em milissegundos? Não é por satélite: mais de 98% da internet do planeta viaja por cabos de FIBRA ÓPTICA gigantes que cruzam o fundo de todos os oceanos! Cada cabo tem fios de vidro mais finos que um fio de cabelo, onde pulsos de luz laser viajam ricocheteando por 'Reflexão Total Interna' na velocidade da luz! Classifique os fatos e mitos das redes de fibra óptica.",
                tipo: "jogo_classificar_fatos",
                tituloBinA: "✅ Fatos Comprovados das Fibras Ópticas",
                subBinA: "Física da luz e cabos submarinos reais",
                tituloBinB: "❌ Mitos Populares da Internet",
                subBinB: "Boatos comuns sobre tráfego de dados",
                itensClassificar: [
                    { id: "f1", nome: "A internet mundial viaja por cabos submarinos de fibra óptica estendidos no fundo do mar", categoria: "fato", desc: "Existem centenas de cabos ligando o Brasil à Europa e EUA no fundo do oceano Atlântico!" },
                    { id: "m1", nome: "Quase 100% da internet do mundo é transmitida por satélites no espaço", categoria: "mito", desc: "Satélites têm atraso (latência) alto; a imensa maioria dos dados viaja por fibras no chão e no mar!" },
                    { id: "f2", nome: "Na fibra óptica, a luz fica presa no vidro por um fenômeno chamado Reflexão Total Interna", categoria: "fato", desc: "O ângulo de refração faz a luz ricochetear eternamente dentro do vidro sem escapar pelas laterais!" },
                    { id: "m2", nome: "Cabos de fibra óptica sofrem interferência magnética de raios e tempestades elétricas", categoria: "mito", desc: "A fibra conduz luz (fótons), e não eletricidade; é 100% imune a raios e campos magnéticos!" },
                    { id: "f3", nome: "Um único feixe de fibra óptica pode transportar bilhões de gigabytes por segundo com lasers coloridos", categoria: "fato", desc: "Diferentes cores de luz viajam juntas na mesma fibra sem se misturarem, multiplicando a velocidade!" },
                    { id: "m3", nome: "A luz dentro da fibra óptica viaja devagar porque o vidro é pesado", categoria: "mito", desc: "A luz viaja no vidro a cerca de 200.000 km/s, cruzando continentes inteiros em milissegundos!" }
                ]
            },
            {
                id: "m3_14",
                titulo: "Fase 14: Gravando o Podcast da Turma (Tech-Cast)",
                codigoBNCC: "Gravação & Edição de Áudio",
                npc: "Júlia (Produtora do Estúdio de Som)",
                local: "Mesa de Áudio do Estúdio",
                posTarget: { x: 20, y: 10 },
                icone: "🎙️",
                resumo: "Ajuste os volumes, tire os chiados e escolha as falas verdadeiras para o podcast.",
                dialogoNPC: "Bem-vindo ao estúdio de gravação! Vamos montar o roteiro do Tech-Cast da turma. Escolha as 3 falas verdadeiras e claras para desmentir boatos e explicar a física das ondas para os ouvintes.",
                tipo: "maker_podcast",
                pautasPodcast: [
                    { id: "a1", bloco: "Abertura Fácil", texto: "Diferença entre o som da voz (que vibra o ar) e as ondas de celular (que viajam pelo ar na velocidade da luz).", valido: true },
                    { id: "e1", bloco: "Boato Falso para Excluir", texto: "Afirmação falsa de que torres de celular transmitem vírus de gripe pelo ar.", valido: false },
                    { id: "a2", bloco: "Saúde e Tecnologia", texto: "Explicar que Wi-Fi e 5G emitem ondas fracas e seguras que não machucam o corpo humano.", valido: true },
                    { id: "a3", bloco: "Como a Informação Chega", texto: "Como o celular transforma ondas invisíveis do ar em músicas, áudios e vídeos na tela.", valido: true }
                ]
            },
            {
                id: "m3_15",
                titulo: "Fase 15: Apresentação Final para a Banca do Colégio",
                codigoBNCC: "Avaliação do Bimestre",
                npc: "Professores da Banca Avaliadora",
                local: "Auditório Principal",
                posTarget: { x: 10, y: 14 },
                icone: "🎧",
                resumo: "Toque o podcast e responda a 3 perguntas práticas para fechar as notas do bimestre.",
                dialogoNPC: "Parabéns por chegar até a audição final! A banca vai ouvir o podcast da sua equipe e fazer 3 perguntas práticas para concluir a avaliação.",
                tipo: "banca_defesa",
                perguntasBanca: [
                    {
                        pergunta: "Por que o Wi-Fi de 5 GHz é mais rápido, mas pega pior quando você vai para outro cômodo atrás de paredes?",
                        respostas: [
                            { txt: "Porque 5 GHz é perigoso e as paredes absorvem para nos proteger.", correta: false },
                            { txt: "Porque o Wi-Fi de 5 GHz desliga a internet quando vê uma parede.", correta: false },
                            { txt: "Porque as ondas de 5 GHz são mais curtas e sofrem mais para conseguir atravessar tijolos e paredes grossas.", correta: true }
                        ]
                    },
                    {
                        pergunta: "Qual é a grande diferença entre o som da nossa voz e o sinal do Wi-Fi?",
                        respostas: [
                            { txt: "O som da voz precisa do ar para vibrar (no espaço não tem som); já o Wi-Fi é uma onda que viaja até no espaço sem ar nenhum.", correta: true },
                            { txt: "O som da nossa voz viaja na velocidade da luz, e o Wi-Fi viaja na velocidade do vento.", correta: false },
                            { txt: "Não há nenhuma diferença, são a mesma coisa.", correta: false }
                        ]
                    },
                    {
                        pergunta: "Por que a luz de uma lâmpada ou o sinal do celular não causam os mesmos perigos que um aparelho de raios-X?",
                        respostas: [
                            { txt: "Porque o corpo humano tem um escudo que bloqueia a luz da lâmpada.", correta: false },
                            { txt: "Porque a luz e o celular têm pouquíssima energia e não conseguem arrancar pedaços das moléculas das nossas células.", correta: true },
                            { txt: "Porque a bateria do celular é recarregável.", correta: false }
                        ]
                    }
                ]
            }
        ]
    }
};

window.TURMAS_DATA = TURMAS_DATA;
