// Módulos Interativos de Simulações e Oficinas
// Inclui: Embaralhador de Respostas, Frenagem e Pista Molhada, Mapa Mental no Caderno e Simulador Completo de Casa Térmica nos Biomas.

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

class SimulationManager {
    constructor() {
        this.activeSim = null;
        this.animFrameId = null;
    }

    renderMissionView(missao, containerEl, onCompleteCallback) {
        this.stopCurrent();
        containerEl.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "sim-wrapper";

        // Cabeçalho Amigável
        const header = document.createElement("div");
        header.className = "sim-header";

        const termos = window.getTermosMissao ? window.getTermosMissao(missao.id) : [];
        let vocabHtml = "";
        if (termos.length > 0) {
            vocabHtml = `
                <div class="sim-vocab-banner">
                    <span class="vocab-banner-label">📚 Vocabulário Físico da Fase:</span>
                    <div class="vocab-banner-chips">
                        ${termos.map(t => `
                            <button class="vocab-chip-btn" data-termo-id="${t.id}" title="Clique para consultar o significado simples de ${t.termo}">
                                <span>${t.icone}</span> <strong>${t.termo}</strong> <span class="chip-info-icon">ℹ️</span>
                            </button>
                        `).join("")}
                    </div>
                </div>
            `;
        }

        header.innerHTML = `
            <div class="sim-badge">📌 ${missao.codigoBNCC}</div>
            <h2 class="sim-title">${missao.icone} ${missao.titulo}</h2>
            <div class="sim-npc-speech">
                <span class="npc-avatar">👤</span>
                <div>
                    <strong>${missao.npc} (${missao.local}):</strong>
                    <p>${missao.dialogoNPC}</p>
                </div>
            </div>
            ${vocabHtml}
        `;
        wrapper.appendChild(header);

        const body = document.createElement("div");
        body.className = "sim-body";

        switch (missao.tipo) {
            case "simulacao_inercia":
                this.renderInerciaSim(body, missao, onCompleteCallback);
                break;
            case "jogo_relacionar":
                this.renderRelacionarGame(body, missao, onCompleteCallback);
                break;
            case "simulacao_impacto":
                this.renderImpactoSim(body, missao, onCompleteCallback);
                break;
            case "jogo_completar":
                this.renderCompletarGame(body, missao, onCompleteCallback);
                break;
            case "simulacao_frenagem":
                this.renderFrenagemSim(body, missao, onCompleteCallback);
                break;
            case "quiz_calculos_transito":
                this.renderQuizCalculos(body, missao, onCompleteCallback);
                break;
            case "maker_mapa_mental":
                this.renderMapaMentalCaderno(body, missao, onCompleteCallback);
                break;
            case "maker_infografico":
                this.renderInfograficoMaker(body, missao, onCompleteCallback);
                break;
            case "simulacao_ilha_calor":
                this.renderIlhaCalorSim(body, missao, onCompleteCallback);
                break;
            case "jogo_classificar_materiais":
                this.renderClassificarMateriais(body, missao, onCompleteCallback);
                break;
            case "simulacao_casa_biomas":
                this.renderCasaBiomaSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_isolamento":
                this.renderIsolamentoSim(body, missao, onCompleteCallback);
                break;
            case "maker_pixel_art":
                this.renderPixelArtMaker(body, missao, onCompleteCallback);
                break;
            case "simulacao_espectro":
                this.renderEspectroSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_antena":
                this.renderAntenaSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_wifi_comodos":
                this.renderWifiComodosSim(body, missao, onCompleteCallback);
                break;
            case "maker_podcast":
                this.renderPodcastMaker(body, missao, onCompleteCallback);
                break;
            case "simulacao_abs":
                this.renderAbsSim(body, missao, onCompleteCallback);
                break;
            case "jogo_classificar_fatos":
                this.renderClassificarFatos(body, missao, onCompleteCallback);
                break;
            case "simulacao_deformacao":
                this.renderDeformacaoSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_garrafa_termica":
                this.renderGarrafaTermicaSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_ventilacao_chamine":
                this.renderVentilacaoChamineSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_vacuo_som_luz":
                this.renderVacuoSomLuzSim(body, missao, onCompleteCallback);
                break;
            case "simulacao_posicionamento_wifi":
                this.renderPosicionamentoWifiSim(body, missao, onCompleteCallback);
                break;
            case "banca_defesa":
                this.renderBancaDefesa(body, missao, onCompleteCallback);
                break;
            default:
                body.innerHTML = "<p>Carregando atividade...</p>";
        }

        wrapper.appendChild(body);
        containerEl.appendChild(wrapper);

        // Eventos dos botões de vocabulário da fase
        wrapper.querySelectorAll(".vocab-chip-btn").forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const termoId = btn.getAttribute("data-termo-id");
                if (window.uiManager && window.uiManager.openVocabulario) {
                    window.uiManager.openVocabulario(termoId);
                }
            };
        });
    }

    stopCurrent() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 1: INÉRCIA E CINTO
    // -------------------------------------------------------------
    renderInerciaSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="inerciaCanvas" width="840" height="250"></canvas>
                <div class="sim-controls">
                    <label class="control-toggle">
                        <input type="checkbox" id="cintoCheck" checked>
                        <span class="toggle-slider"></span>
                        <strong id="cintoStatusTxt">Cinto de Segurança: LIGADO (SEGURO)</strong>
                    </label>
                    <div class="control-group">
                        <span>Velocidade do Carro:</span>
                        <button class="btn-retro sm" id="btnVel36">36 km/h</button>
                        <button class="btn-retro sm active" id="btnVel72">72 km/h</button>
                        <button class="btn-retro sm" id="btnVel108">108 km/h</button>
                    </div>
                    <button class="btn-retro danger" id="btnDispararFreio">🚨 FREAR BRUSCAMENTE NO SUSTO!</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="inerciaFeedback">
                <p><strong>Teste prático:</strong> Ligue ou desligue o cinto e aperte o botão vermelho para ver se o boneco voa pelo vidro ou fica seguro no banco.</p>
            </div>
            <div class="calc-box" id="inerciaCalcBox" style="display:none;">
                <div class="calc-badge">Desafio Prático: Calculando o Embalo</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="inerciaOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#inerciaCanvas");
        const ctx = canvas.getContext("2d");
        const cintoCheck = container.querySelector("#cintoCheck");
        const cintoStatusTxt = container.querySelector("#cintoStatusTxt");
        const btnDisparar = container.querySelector("#btnDispararFreio");
        const feedback = container.querySelector("#inerciaFeedback");
        const calcBox = container.querySelector("#inerciaCalcBox");

        let speedKmh = 72;
        let v_ms = 20;
        let carX = 40;
        let dummyFlying = false;
        let dummyFlyX = 0;
        let dummyFlyY = 0;
        let carBraking = false;
        let carStopped = false;

        cintoCheck.onchange = () => {
            if (window.soundEngine) window.soundEngine.playDial();
            cintoStatusTxt.innerText = cintoCheck.checked ? "Cinto de Segurança: LIGADO (SEGURO)" : "Cinto de Segurança: DESLIGADO (PERIGO!)";
            cintoStatusTxt.style.color = cintoCheck.checked ? "#10b981" : "#ef4444";
        };

        const setVel = (kmh, ms, btnId) => {
            speedKmh = kmh;
            v_ms = ms;
            container.querySelectorAll("#btnVel36, #btnVel72, #btnVel108").forEach(b => b.classList.remove("active"));
            container.querySelector("#" + btnId).classList.add("active");
            if (window.soundEngine) window.soundEngine.playDial();
        };
        container.querySelector("#btnVel36").onclick = () => setVel(36, 10, "btnVel36");
        container.querySelector("#btnVel72").onclick = () => setVel(72, 20, "btnVel72");
        container.querySelector("#btnVel108").onclick = () => setVel(108, 30, "btnVel108");

        const resetCar = () => {
            carX = 50;
            dummyFlying = false;
            dummyFlyX = 0;
            dummyFlyY = 0;
            carBraking = false;
            carStopped = false;
        };

        btnDisparar.onclick = () => {
            resetCar();
            carBraking = true;
            if (window.soundEngine) window.soundEngine.playCrash();
        };

        const draw = () => {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Pista
            ctx.fillStyle = "#334155";
            ctx.fillRect(0, 160, canvas.width, 90);
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 3;
            ctx.setLineDash([25, 20]);
            ctx.beginPath();
            ctx.moveTo(0, 205);
            ctx.lineTo(canvas.width, 205);
            ctx.stroke();
            ctx.setLineDash([]);

            // Barreira
            ctx.fillStyle = "#dc2626";
            ctx.fillRect(660, 120, 40, 90);
            ctx.fillStyle = "#fef08a";
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(660, 125 + i * 22, 40, 10);
            }

            // Física do Carro
            if (carBraking && !carStopped) {
                carX += (v_ms * 0.45);
                if (carX >= 470) {
                    carStopped = true;
                    if (!cintoCheck.checked) {
                        dummyFlying = true;
                        dummyFlyX = carX + 80;
                        dummyFlyY = 130;
                    }

                    if (cintoCheck.checked) {
                        feedback.innerHTML = `
                            <p class="text-success"><strong>✅ COM O CINTO:</strong> O cinto segurou o corpo no banco! O carro parou e a pessoa ficou protegida.</p>
                        `;
                    } else {
                        feedback.innerHTML = `
                            <p class="text-danger"><strong>⚠️ SEM O CINTO (Inércia pura!):</strong> O carro parou, mas o corpo continuou voando a ${speedKmh} km/h e quebrou o vidro!</p>
                        `;
                    }
                    if (calcBox.style.display === "none") {
                        calcBox.style.display = "block";
                        renderCalcOptions();
                    }
                }
            }

            // Carro
            ctx.fillStyle = "#3b82f6";
            ctx.fillRect(carX, 130, 150, 50);
            ctx.fillStyle = "#93c5fd";
            ctx.fillRect(carX + 30, 95, 90, 38);

            // Rodas
            ctx.fillStyle = "#0f172a";
            ctx.beginPath();
            ctx.arc(carX + 40, 180, 18, 0, Math.PI * 2);
            ctx.arc(carX + 120, 180, 18, 0, Math.PI * 2);
            ctx.fill();

            // Boneco
            if (!dummyFlying) {
                ctx.fillStyle = "#facc15";
                ctx.beginPath();
                ctx.arc(carX + 80, 110, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#e2e8f0";
                ctx.fillRect(carX + 74, 120, 14, 24);
                if (cintoCheck.checked) {
                    ctx.strokeStyle = "#ef4444";
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(carX + 70, 120);
                    ctx.lineTo(carX + 90, 144);
                    ctx.stroke();
                }
            } else {
                dummyFlyX += v_ms * 0.4;
                dummyFlyY += 0.8;
                if (dummyFlyX > 650) dummyFlyX = 650;
                ctx.fillStyle = "#ef4444";
                ctx.beginPath();
                ctx.arc(dummyFlyX, dummyFlyY, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillRect(dummyFlyX - 6, dummyFlyY + 10, 14, 22);
            }

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(`Velocidade: ${carStopped ? '0' : speedKmh} km/h`, 25, 30);
            ctx.fillText(`Peso do Passageiro: 70 kg`, 25, 52);

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const renderCalcOptions = () => {
            const optsContainer = container.querySelector("#inerciaOptions");
            optsContainer.innerHTML = "";
            const shuffled = shuffleArray(missao.calcData.opcoes);
            shuffled.forEach(op => {
                const btn = document.createElement("button");
                btn.className = "btn-option";
                btn.innerText = `${op.valor} ${missao.calcData.unidade}`;
                btn.onclick = () => {
                    if (op.correta) {
                        btn.classList.add("correct");
                        feedback.innerHTML = `<p class="text-success"><strong>🎉 ACERTOU EM CHEIO!</strong> ${op.explicacao}</p>`;
                        if (window.soundEngine) window.soundEngine.playSuccess();
                        setTimeout(() => onComplete(), 1500);
                    } else {
                        btn.classList.add("wrong");
                        feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente de novo:</strong> ${op.explicacao}</p>`;
                        if (window.soundEngine) window.soundEngine.playError();
                    }
                };
                optsContainer.appendChild(btn);
            });
        };
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 2: IMPACTO & AIRBAG
    // -------------------------------------------------------------
    renderImpactoSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-dashboard">
                <div class="meter-column">
                    <div class="meter-card">
                        <span class="meter-label">Tempo da Parada (Arraste para inflar o Airbag):</span>
                        <input type="range" id="tempoSlider" min="0.02" max="0.20" step="0.02" value="0.02">
                        <div class="meter-val"><strong id="tempoVal">0,02 segundo</strong></div>
                    </div>
                    <div class="meter-card">
                        <span class="meter-label">Tamanho da Pancada no Peito:</span>
                        <div class="force-display" id="forcaVal">70.000 pontos</div>
                        <div class="danger-bar-wrapper">
                            <div class="danger-bar" id="dangerBar" style="width: 100%; background: #ef4444;"></div>
                        </div>
                        <div class="meter-status" id="statusTox">💀 Pancada Dura no Volante (Grave perigo)</div>
                    </div>
                </div>
                <div class="graph-column">
                    <canvas id="impactGraphCanvas" width="400" height="220"></canvas>
                </div>
            </div>
            <div class="sim-feedback-card" id="impactoFeedback">
                <p>Arraste o controle para a direita para <strong>inflar o airbag</strong> e veja como o tempo a mais faz a pancada ficar 10 vezes menor!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Prático: Dividindo a Força</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="impactoOptions"></div>
            </div>
        `;

        const slider = container.querySelector("#tempoSlider");
        const tempoVal = container.querySelector("#tempoVal");
        const forcaVal = container.querySelector("#forcaVal");
        const dangerBar = container.querySelector("#dangerBar");
        const statusTox = container.querySelector("#statusTox");
        const feedback = container.querySelector("#impactoFeedback");
        const gCanvas = container.querySelector("#impactGraphCanvas");
        const gCtx = gCanvas.getContext("2d");

        const updateSim = () => {
            const dt = parseFloat(slider.value);
            const force = Math.round(1400 / dt);
            tempoVal.innerText = `${dt.toFixed(2).replace('.', ',')} segundo`;
            forcaVal.innerText = `${force.toLocaleString('pt-BR')} pontos de força`;

            const pct = Math.min(100, (force / 70000) * 100);
            dangerBar.style.width = `${pct}%`;

            if (dt < 0.06) {
                tempoVal.innerText += " (Sem Airbag - Bate no volante)";
                statusTox.innerText = "💀 Pancada Fatal no Volante";
                statusTox.style.color = "#ef4444";
                dangerBar.style.background = "#ef4444";
            } else if (dt < 0.14) {
                tempoVal.innerText += " (Airbag enchendo)";
                statusTox.innerText = "⚠️ Pancada Média";
                statusTox.style.color = "#f59e0b";
                dangerBar.style.background = "#f59e0b";
            } else {
                tempoVal.innerText += " (Airbag 100% inflado)";
                statusTox.innerText = "🛡️ Pancada 10x mais suave! Sobrevivência garantida";
                statusTox.style.color = "#10b981";
                dangerBar.style.background = "#10b981";
            }

            gCtx.fillStyle = "#0f172a";
            gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);

            gCtx.strokeStyle = "#475569";
            gCtx.lineWidth = 2;
            gCtx.beginPath();
            gCtx.moveTo(50, 20);
            gCtx.lineTo(50, 180);
            gCtx.lineTo(370, 180);
            gCtx.stroke();

            gCtx.fillStyle = "#94a3b8";
            gCtx.font = "bold 12px sans-serif";
            gCtx.fillText("Força da Pancada", 10, 18);
            gCtx.fillText("Tempo para Parar", 270, 205);

            gCtx.strokeStyle = dt >= 0.15 ? "#10b981" : "#ef4444";
            gCtx.lineWidth = 4;
            gCtx.beginPath();
            const curveWidth = (dt / 0.20) * 260 + 30;
            const peakHeight = Math.min(150, (force / 70000) * 150);

            gCtx.moveTo(60, 180);
            gCtx.quadraticCurveTo(60 + curveWidth / 2, 180 - peakHeight, 60 + curveWidth, 180);
            gCtx.stroke();

            gCtx.fillStyle = dt >= 0.15 ? "#10b981" : "#ef4444";
            gCtx.fillText(`Pico: ${force}`, 60 + curveWidth / 2 - 25, 170 - peakHeight);
        };

        slider.oninput = () => {
            if (window.soundEngine) window.soundEngine.playDial();
            updateSim();
        };
        updateSim();

        const optsContainer = container.querySelector("#impactoOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor} ${missao.calcData.unidade}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 PERFEITO!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 3: FRENAGEM, ATRITO E PISTA MOLHADA
    // -------------------------------------------------------------
    renderFrenagemSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="freioCanvas" width="840" height="240"></canvas>
                <div class="sim-controls">
                    <label class="control-toggle">
                        <input type="checkbox" id="chuvaCheck">
                        <span class="toggle-slider"></span>
                        <strong id="chuvaStatusTxt">Condição da Pista: SECA (Bom Atrito)</strong>
                    </label>
                    <div class="control-group">
                        <span>Velocidade de Teste:</span>
                        <button class="btn-retro sm active" id="btnFreio40">40 km/h</button>
                        <button class="btn-retro sm" id="btnFreio60">60 km/h</button>
                        <button class="btn-retro sm" id="btnFreio80">80 km/h</button>
                    </div>
                    <button class="btn-retro success" id="btnDispararFreioPista">🚗 PISAR NO FREIO TOTAL!</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="freioFeedback">
                <p>Veja como <strong>dobrar a velocidade</strong> (de 40 para 80 km/h) faz o carro precisar de <strong>4 vezes mais pista</strong> para conseguir parar!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Prático: Distância de Parada</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="freioOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#freioCanvas");
        const ctx = canvas.getContext("2d");
        const chuvaCheck = container.querySelector("#chuvaCheck");
        const chuvaTxt = container.querySelector("#chuvaStatusTxt");
        const feedback = container.querySelector("#freioFeedback");
        const btnFreio = container.querySelector("#btnDispararFreioPista");

        let speed = 40;
        let isWet = false;
        let carX = 40;
        let braking = false;
        let stopped = false;
        let stopDistanceMeters = 10;

        chuvaCheck.onchange = () => {
            isWet = chuvaCheck.checked;
            chuvaTxt.innerText = isWet ? "Condição da Pista: MOLHADA PELA CHUVA (Muito Lisa!)" : "Condição da Pista: SECA (Bom Atrito)";
            chuvaTxt.style.color = isWet ? "#38bdf8" : "#facc15";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const setSpeed = (spd, btnId) => {
            speed = spd;
            container.querySelectorAll("#btnFreio40, #btnFreio60, #btnFreio80").forEach(b => b.classList.remove("active"));
            container.querySelector("#" + btnId).classList.add("active");
            if (window.soundEngine) window.soundEngine.playDial();
        };

        container.querySelector("#btnFreio40").onclick = () => setSpeed(40, "btnFreio40");
        container.querySelector("#btnFreio60").onclick = () => setSpeed(60, "btnFreio60");
        container.querySelector("#btnFreio80").onclick = () => setSpeed(80, "btnFreio80");

        btnFreio.onclick = () => {
            carX = 50;
            braking = true;
            stopped = false;
            // Cálculo da distância
            let baseDist = 10;
            if (speed === 60) baseDist = 22.5;
            if (speed === 80) baseDist = 40;
            if (isWet) baseDist *= 2; // Pista molhada dobra
            stopDistanceMeters = Math.round(baseDist);
            if (window.soundEngine) window.soundEngine.playCrash();
        };

        const draw = () => {
            ctx.fillStyle = isWet ? "#0f172a" : "#1e293b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Efeito de chuva se ligada
            if (isWet) {
                ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
                ctx.lineWidth = 1.5;
                for (let i = 0; i < 30; i++) {
                    const rx = (i * 32 + (Date.now() / 2)) % canvas.width;
                    const ry = (i * 18 + (Date.now() / 3)) % 140;
                    ctx.beginPath();
                    ctx.moveTo(rx, ry);
                    ctx.lineTo(rx - 8, ry + 16);
                    ctx.stroke();
                }
            }

            // Pista
            ctx.fillStyle = isWet ? "#1e293b" : "#334155";
            ctx.fillRect(0, 140, canvas.width, 100);

            // Linhas métricas na pista
            ctx.strokeStyle = "#64748b";
            ctx.lineWidth = 2;
            for (let m = 0; m <= 80; m += 10) {
                const px = 100 + m * 8;
                ctx.beginPath();
                ctx.moveTo(px, 140);
                ctx.lineTo(px, 160);
                ctx.stroke();
                ctx.fillStyle = "#cbd5e1";
                ctx.font = "bold 11px sans-serif";
                ctx.fillText(`${m}m`, px - 10, 175);
            }

            // Ponto de início de frenagem
            ctx.fillStyle = "#ef4444";
            ctx.fillRect(100, 140, 6, 100);
            ctx.fillStyle = "#fef08a";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("Ponto de Freio", 65, 130);

            // Animação do Carro
            if (braking && !stopped) {
                const targetPx = 100 + stopDistanceMeters * 8;
                carX += 5;
                if (carX >= targetPx) {
                    carX = targetPx;
                    stopped = true;
                    feedback.innerHTML = `
                        <p class="text-success"><strong>Distância de Parada Medida: ${stopDistanceMeters} metros!</strong><br>
                        ${isWet ? '🌧️ Na pista molhada, a água fez as rodas deslizarem e a distância dobrou!' : '☀️ No asfalto seco, o atrito dos pneus segurou o carro.'}</p>
                    `;
                }
            }

            // Carro
            ctx.fillStyle = "#2563eb";
            ctx.fillRect(carX - 80, 180, 80, 36);
            ctx.fillStyle = "#93c5fd";
            ctx.fillRect(carX - 65, 160, 45, 20);

            // Rodas
            ctx.fillStyle = "#020617";
            ctx.beginPath();
            ctx.arc(carX - 60, 216, 12, 0, Math.PI * 2);
            ctx.arc(carX - 20, 216, 12, 0, Math.PI * 2);
            ctx.fill();

            // Faixa de rastro de frenagem
            if (carX > 100) {
                ctx.fillStyle = isWet ? "rgba(56, 189, 248, 0.4)" : "rgba(0, 0, 0, 0.45)";
                ctx.fillRect(100, 214, carX - 100, 4);
            }

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        // Opções embaralhadas
        const optsContainer = container.querySelector("#freioOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 EXCELENTE!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // OFICINA DO MAPA MENTAL NO CADERNO ESCOLAR (DESIGN MODERNO & VISUAL)
    // -------------------------------------------------------------
    renderMapaMentalCaderno(container, missao, onComplete) {
        const centro = missao.centroMapa || {
            titulo: "FÍSICA NO COTIDIANO",
            subtitulo: "Registro Pedagógico no Caderno",
            icone: "📖",
            cor: "#ef4444"
        };
        const ramos = missao.ramosMapaMental || [];
        const totalEtapas = 1 + ramos.length;

        container.innerHTML = `
            <div class="mindmap-activity-container">
                <!-- Cabeçalho de Orientação -->
                <div class="mindmap-guide-banner">
                    <div class="guide-banner-icon">✏️📖</div>
                    <div class="guide-banner-content">
                        <h3>Atividade Prática: Desenhe o Mapa Mental no Caderno Físico!</h3>
                        <p>
                            Abra o seu caderno escolar em uma folha em branco (na horizontal ou vertical).
                            Siga o modelo visual abaixo: desenhe o <strong>Núcleo Central</strong> no meio da página e depois puxe os <strong>4 Ramos Coloridos</strong> com as setas e explicações.
                        </p>
                    </div>
                </div>

                <!-- Folha Realista de Caderno de Desenho / Estudo -->
                <div class="notebook-sheet-card">
                    <!-- Espiral Metálica do Topo do Caderno -->
                    <div class="notebook-spiral-strip">
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                        <div class="spiral-ring"></div>
                    </div>

                    <!-- Corpo da Folha Pautada com Margem -->
                    <div class="notebook-sheet-body">
                        <!-- Núcleo Central do Mapa Mental -->
                        <div class="mindmap-central-hub" style="border-color: ${centro.cor};">
                            <div class="hub-tag">⭐ NÚCLEO CENTRAL DO MAPA</div>
                            <div class="hub-title">${centro.icone} ${centro.titulo}</div>
                            <div class="hub-sub">${centro.subtitulo}</div>
                        </div>

                        <!-- Grid dos 4 Ramos Radiantes -->
                        <div class="mindmap-branches-grid" id="branchesGrid"></div>
                    </div>
                </div>

                <!-- Checklist Interativo com Barra de Progresso -->
                <div class="mindmap-checklist-panel">
                    <div class="checklist-header">
                        <div>
                            <h4>✅ Checklist de Registro no Caderno do Aluno</h4>
                            <div class="checklist-subtitle">Marque cada caixinha conforme você for desenhando no seu caderno real:</div>
                        </div>
                        <div class="checklist-progress-badge" id="checklistProgressBadge">Progresso: 0 de ${totalEtapas} (0%)</div>
                    </div>

                    <div class="checklist-progress-bar">
                        <div class="checklist-progress-fill" id="checklistProgressFill" style="width: 0%;"></div>
                    </div>

                    <div class="checklist-items-grid" id="checklistItemsGrid">
                        <!-- Item do Centro -->
                        <label class="checklist-toggle-card" id="cardChkCentro">
                            <input type="checkbox" id="chkCentro">
                            <span class="custom-chk-box"></span>
                            <div class="chk-label-text">
                                <strong>1. Desenhei o Núcleo Central:</strong>
                                <span>"${centro.titulo}"</span>
                            </div>
                        </label>
                    </div>

                    <button class="btn-retro success full-width" id="btnConcluirMapa" style="margin-top: 18px;" disabled>
                        Validar e Concluir Mapa Mental no Caderno
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="mapaFeedback" style="margin-top: 14px;">
                <p>Marque as ${totalEtapas} etapas acima conforme for finalizando o desenho no seu caderno escolar.</p>
            </div>
        `;

        const grid = container.querySelector("#branchesGrid");
        const chkGrid = container.querySelector("#checklistItemsGrid");
        const progressBadge = container.querySelector("#checklistProgressBadge");
        const progressFill = container.querySelector("#checklistProgressFill");
        const btnConcluir = container.querySelector("#btnConcluirMapa");
        const feedback = container.querySelector("#mapaFeedback");

        const checkboxes = [container.querySelector("#chkCentro")];

        ramos.forEach((r, idx) => {
            const card = document.createElement("div");
            card.className = "mindmap-branch-node";
            card.style.borderColor = r.cor;
            card.innerHTML = `
                <div class="branch-node-header">
                    <span class="branch-badge" style="background: ${r.cor};">${r.icone || '📌'} ${r.tag || `RAMO ${idx + 1}`}</span>
                    <span class="branch-drawing-hint">📍 ${r.dicaDesenho || `Ramo ${idx + 1}`}</span>
                </div>
                <h4 class="branch-title" style="color: ${r.cor};">${r.nome}</h4>
                <ul class="branch-items-list">
                    ${r.itens.map(it => `
                        <li class="branch-item">
                            <span class="branch-bullet-icon" style="color: ${r.cor};">➔</span>
                            <span>${it}</span>
                        </li>
                    `).join("")}
                </ul>
            `;
            grid.appendChild(card);

            const chkCard = document.createElement("label");
            chkCard.className = "checklist-toggle-card";
            chkCard.id = `cardChkR${idx + 1}`;
            chkCard.innerHTML = `
                <input type="checkbox" id="chkR${idx + 1}">
                <span class="custom-chk-box"></span>
                <div class="chk-label-text">
                    <strong>${idx + 2}. Desenhei o Ramo ${idx + 1}:</strong>
                    <span>"${r.nome}"</span>
                </div>
            `;
            chkGrid.appendChild(chkCard);

            const inputEl = chkCard.querySelector("input");
            checkboxes.push(inputEl);
        });

        const updateChecklist = () => {
            const checkedCount = checkboxes.filter(c => c.checked).length;
            const pct = Math.round((checkedCount / totalEtapas) * 100);

            progressBadge.innerText = `Progresso: ${checkedCount} de ${totalEtapas} (${pct}%)`;
            progressFill.style.width = `${pct}%`;

            checkboxes.forEach(c => {
                const parent = c.closest(".checklist-toggle-card");
                if (c.checked) {
                    parent.classList.add("checked");
                } else {
                    parent.classList.remove("checked");
                }
            });

            btnConcluir.disabled = checkedCount < totalEtapas;
        };

        checkboxes.forEach(chk => {
            chk.onchange = () => {
                if (window.soundEngine) window.soundEngine.playDial();
                updateChecklist();
            };
        });

        btnConcluir.onclick = () => {
            feedback.innerHTML = `<p class="text-success"><strong>🎉 PARABÉNS!</strong> Seu Mapa Mental está completo e registrado no caderno! Esse resumo visual será fundamental para seus estudos e para a apresentação da equipe.</p>`;
            if (window.soundEngine) window.soundEngine.playSuccess();
            setTimeout(() => onComplete(), 1800);
        };
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 5: MAKER DO CARTAZ DIGITAL (LAYOUT LIMPO E VIBRANTE)
    // -------------------------------------------------------------
    renderInfograficoMaker(container, missao, onComplete) {
        container.innerHTML = `
            <div class="maker-clean-panel">
                <p class="maker-instructions-prompt">
                    Clique nas <strong>3 frases verdadeiras</strong> para publicar na campanha escolar:
                </p>
                <div class="maker-blocks-pool" id="poolBlocos"></div>
                <div class="maker-action-bar">
                    <div class="maker-counter-badge" id="infograficoCounter">Frases selecionadas: 0 de 3</div>
                    <button class="btn-retro success" id="btnPublicarInfografico" disabled>
                        Publicar Cartaz Escolar
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="makerFeedback" style="margin-top: 14px;"></div>
        `;

        const pool = container.querySelector("#poolBlocos");
        const btnPublicar = container.querySelector("#btnPublicarInfografico");
        const counter = container.querySelector("#infograficoCounter");
        const feedback = container.querySelector("#makerFeedback");

        const selected = new Set();
        const shuffled = shuffleArray(missao.itensInfografico);

        shuffled.forEach(item => {
            const card = document.createElement("div");
            card.className = "maker-block-item";
            card.innerHTML = `<span class="item-check-icon">⬜</span> <div>${item.texto}</div>`;
            card.onclick = () => {
                if (selected.has(item.id)) {
                    selected.delete(item.id);
                    card.classList.remove("selected");
                    card.querySelector(".item-check-icon").innerText = "⬜";
                } else {
                    if (selected.size >= 3) {
                        feedback.innerHTML = "<p class='text-danger'>Você já escolheu 3 frases. Clique em uma para desmarcar se quiser trocar.</p>";
                        return;
                    }
                    selected.add(item.id);
                    card.classList.add("selected");
                    card.querySelector(".item-check-icon").innerText = "✅";
                }
                if (window.soundEngine) window.soundEngine.playDial();
                counter.innerText = `Frases selecionadas: ${selected.size} de 3`;
                btnPublicar.disabled = selected.size !== 3;
            };
            pool.appendChild(card);
        });

        btnPublicar.onclick = () => {
            const selArray = Array.from(selected);
            const allCorrect = selArray.every(id => {
                const item = missao.itensInfografico.find(x => x.id === id);
                return item.correto === true;
            });

            if (allCorrect) {
                feedback.innerHTML = `<p class="text-success"><strong>🎉 Cartaz Aprovado com Nota 10!</strong> Frases nítidas, cientificamente corretas e que todos vão entender!</p>`;
                if (window.soundEngine) window.soundEngine.playSuccess();
                setTimeout(() => onComplete(), 1500);
            } else {
                feedback.innerHTML = `<p class="text-danger"><strong>❌ Cuidado:</strong> Você selecionou um mito falso de trânsito! Remova o mito e use apenas as regras físicas verdadeiras.</p>`;
                if (window.soundEngine) window.soundEngine.playError();
            }
        };
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 1: TERMÔMETRO NA CIDADE (ILHAS DE CALOR)
    // -------------------------------------------------------------
    renderIlhaCalorSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="calorCanvas" width="840" height="260"></canvas>
                <div class="sim-controls">
                    <span>Aponte o Termômetro para medir o calor:</span>
                    <button class="btn-retro sm" id="btnAsfalto">1. Asfalto Preto da Rua</button>
                    <button class="btn-retro sm" id="btnTelha">2. Telhado Escuro de Telha</button>
                    <button class="btn-retro sm" id="btnTelhadoClaro">3. Telhado com Tinta Branca</button>
                    <button class="btn-retro sm" id="btnBosque">4. Sombra das Árvores</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="calorFeedback">
                <p>Clique nos botões para medir o calor em cada lugar da cidade.</p>
            </div>
            <div class="calc-box" id="calorCalcBox">
                <div class="calc-badge">Pergunta Rápida: Como o Calor Viaja?</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="calorOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#calorCanvas");
        const ctx = canvas.getContext("2d");
        const feedback = container.querySelector("#calorFeedback");

        const pontos = {
            asfalto: { nome: "Asfalto Preto da Rua", temp: 53, x: 140, y: 210, desc: "A cor preta engole a luz do sol e fica fervendo a 53°C! O asfalto quente esquenta os pés e esquenta o ar da cidade toda." },
            telha: { nome: "Telhado Escuro de Telha", temp: 47, x: 340, y: 130, desc: "Sem forro e com telha escura, ela ferve no sol e joga esse calor todo para dentro do quarto da casa." },
            telhadoClaro: { nome: "Telhado Pintado de Branco", temp: 29, x: 500, y: 130, desc: "A cor branca funciona feito um espelho: rebate os raios do sol para o céu e a casa fica fresquinha a 29°C!" },
            bosque: { nome: "Sombra das Árvores e Grama", temp: 25, x: 700, y: 180, desc: "A sombra das folhas e a água das plantas refrescam o ambiente naturalmente, mantendo a temperatura a 25°C." }
        };

        let selectedKey = "asfalto";

        const drawScene = () => {
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(0, 0, canvas.width, 160);

            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(80, 55, 36, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(253, 224, 71, 0.4)";
            ctx.lineWidth = 3;
            for (let i = 0; i < 7; i++) {
                ctx.beginPath();
                ctx.moveTo(80, 55);
                ctx.lineTo(140 + i * 100, 220);
                ctx.stroke();
            }

            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 200, 280, 60);

            ctx.fillStyle = "#b45309";
            ctx.fillRect(300, 150, 100, 70);
            ctx.fillStyle = "#78350f";
            ctx.beginPath();
            ctx.moveTo(290, 150);
            ctx.lineTo(350, 110);
            ctx.lineTo(410, 150);
            ctx.fill();

            ctx.fillStyle = "#0284c7";
            ctx.fillRect(470, 150, 100, 70);
            ctx.fillStyle = "#f8fafc";
            ctx.beginPath();
            ctx.moveTo(460, 150);
            ctx.lineTo(520, 110);
            ctx.lineTo(580, 150);
            ctx.fill();

            ctx.fillStyle = "#15803d";
            ctx.beginPath();
            ctx.arc(700, 170, 55, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#78350f";
            ctx.fillRect(694, 200, 14, 40);

            const p = pontos[selectedKey];
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
            ctx.fillRect(25, 90, 220, 55);
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 2;
            ctx.strokeRect(25, 90, 220, 55);

            ctx.fillStyle = p.temp > 40 ? "#ef4444" : "#10b981";
            ctx.font = "bold 22px sans-serif";
            ctx.fillText(`${p.temp}°C`, 45, 128);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText(p.nome, 45, 108);
        };

        const selectPoint = (key) => {
            selectedKey = key;
            if (window.soundEngine) window.soundEngine.playDial();
            drawScene();
            const p = pontos[key];
            feedback.innerHTML = `<p><strong>${p.nome} (${p.temp}°C):</strong> ${p.desc}</p>`;
        };

        container.querySelector("#btnAsfalto").onclick = () => selectPoint("asfalto");
        container.querySelector("#btnTelha").onclick = () => selectPoint("telha");
        container.querySelector("#btnTelhadoClaro").onclick = () => selectPoint("telhadoClaro");
        container.querySelector("#btnBosque").onclick = () => selectPoint("bosque");

        drawScene();

        const optsContainer = container.querySelector("#calorOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = op.valor;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 RESPOSTA CERTA!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 2: SIMULADOR COMPLETO DE CONSTRUÇÃO DE CASA TÉRMICA (BIOMAS & ESTAÇÕES)
    // -------------------------------------------------------------
    renderCasaBiomaSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="house-sim-container">
                <div class="house-sim-selectors">
                    <div class="selector-panel">
                        <div class="selector-title">🌍 Bioma Brasileiro:</div>
                        <div class="selector-chips">
                            <button class="btn-chip active" id="chipCerrado">Cerrado (Seco)</button>
                            <button class="btn-chip" id="chipSertao">Sertão (Calor Extremo)</button>
                            <button class="btn-chip" id="chipLitoral">Litoral (Mormaço)</button>
                            <button class="btn-chip" id="chipSul">Sul (Frio/Ameno)</button>
                        </div>
                    </div>

                    <div class="selector-panel">
                        <div class="selector-title">🌤️ Estação do Ano:</div>
                        <div class="selector-chips">
                            <button class="btn-chip active" id="chipVerao">☀️ Verão (Sol Forte)</button>
                            <button class="btn-chip" id="chipInverno">❄️ Inverno</button>
                        </div>
                    </div>

                    <div class="selector-panel">
                        <div class="selector-title">🏙️ Vizinhança / Contexto:</div>
                        <div class="selector-chips">
                            <button class="btn-chip active" id="chipUrbano">Centro com Asfalto (+4°C)</button>
                            <button class="btn-chip" id="chipVerde">Bairro Arborizado (-3°C)</button>
                        </div>
                    </div>
                </div>

                <div class="house-materials-grid">
                    <div class="material-select-box">
                        <label>1. Telhado da Casa:</label>
                        <select id="selTelhado" class="select-retro">
                            <option value="fibrocimento">Telha Escura (Ferve no sol)</option>
                            <option value="branco" selected>Telhado Branco (Reflete 85% do sol)</option>
                            <option value="verde">Telhado Verde (Com Plantas)</option>
                            <option value="ceramica">Telha Cerâmica com Beiral Largo</option>
                        </select>
                    </div>

                    <div class="material-select-box">
                        <label>2. Forro Térmico:</label>
                        <select id="selForro" class="select-retro">
                            <option value="nenhum">Sem Forro (Calor desce direto)</option>
                            <option value="tetrapak" selected>Caixas de Leite Tetra Pak (Prateado)</option>
                            <option value="isopor">Placas de Isopor Reciclado</option>
                            <option value="duplo">Forro Duplo com Bolsão de Ar</option>
                        </select>
                    </div>

                    <div class="material-select-box">
                        <label>3. Cor e Material da Parede:</label>
                        <select id="selParede" class="select-retro">
                            <option value="escura">Paredes Escuras (Engolem calor)</option>
                            <option value="branca" selected>Paredes Brancas / Claras</option>
                            <option value="adobe">Tijolo Ecológico / Adobe Grosso</option>
                        </select>
                    </div>

                    <div class="material-select-box">
                        <label>4. Ventilação e Janelas:</label>
                        <select id="selVentilacao" class="select-retro">
                            <option value="unica">Janela Única (Ar quente fica preso)</option>
                            <option value="cruzada" selected>Janelas Cruzadas Opostas (Vento entra e sai)</option>
                            <option value="lanternim">Abertura no Alto do Teto (Ar quente sobe e sai)</option>
                        </select>
                    </div>
                </div>

                <div class="house-canvas-box">
                    <canvas id="houseBiomaCanvas" width="840" height="260"></canvas>
                </div>

                <div class="house-gauges-row">
                    <div class="gauge-card">
                        <div class="gauge-label">Temperatura Lá Fora:</div>
                        <div class="gauge-value" id="dispTempFora" style="color: #ef4444;">38°C</div>
                        <div class="gauge-desc" id="dispContextoTxt">Sol a pino no Cerrado</div>
                    </div>

                    <div class="gauge-card">
                        <div class="gauge-label">Temperatura DENTRO da Casa:</div>
                        <div class="gauge-value" id="dispTempDentro" style="color: #10b981;">24°C</div>
                        <div class="gauge-desc" id="dispConfortoTxt">🟢 Conforto Ideal!</div>
                    </div>

                    <div class="gauge-card">
                        <div class="gauge-label">Economia de Energia:</div>
                        <div class="gauge-value" id="dispEconomia" style="color: #10b981;">100%</div>
                        <div class="gauge-desc">Sem gastar com ar-condicionado!</div>
                    </div>

                    <div class="gauge-card">
                        <div class="gauge-label">Avaliação Térmica:</div>
                        <button class="btn-retro success full-width" id="btnAprovarCasa" style="margin-top: 6px;">
                            Aprovar Projeto Térmico
                        </button>
                    </div>
                </div>
            </div>

            <div class="sim-feedback-card" id="houseFeedback">
                <p>Alterne os biomas, estações e materiais acima para atingir a temperatura ideal de conforto (entre 22°C e 26°C).</p>
            </div>
        `;

        const canvas = container.querySelector("#houseBiomaCanvas");
        const ctx = canvas.getContext("2d");

        let state = {
            bioma: "cerrado",
            estacao: "verao",
            contexto: "urbano",
            telhado: "branco",
            forro: "tetrapak",
            parede: "branca",
            ventilacao: "cruzada"
        };

        const setupChips = (prefix, prop) => {
            container.querySelectorAll(`[id^="${prefix}"]`).forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll(`[id^="${prefix}"]`).forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    state[prop] = btn.id.replace(prefix, "").toLowerCase();
                    if (window.soundEngine) window.soundEngine.playDial();
                    calcThermodynamics();
                };
            });
        };

        setupChips("chip", "bioma"); // Cerrado, Sertao, Litoral, Sul
        // Custom mapping for chips
        container.querySelector("#chipCerrado").onclick = (e) => {
            setActiveChip("chip", e.target); state.bioma = "cerrado"; calcThermodynamics();
        };
        container.querySelector("#chipSertao").onclick = (e) => {
            setActiveChip("chip", e.target); state.bioma = "sertao"; calcThermodynamics();
        };
        container.querySelector("#chipLitoral").onclick = (e) => {
            setActiveChip("chip", e.target); state.bioma = "litoral"; calcThermodynamics();
        };
        container.querySelector("#chipSul").onclick = (e) => {
            setActiveChip("chip", e.target); state.bioma = "sul"; calcThermodynamics();
        };

        container.querySelector("#chipVerao").onclick = (e) => {
            setActiveChip("chipV", e.target); state.estacao = "verao"; calcThermodynamics();
        };
        container.querySelector("#chipInverno").onclick = (e) => {
            setActiveChip("chipV", e.target); state.estacao = "inverno"; calcThermodynamics();
        };

        container.querySelector("#chipUrbano").onclick = (e) => {
            setActiveChip("chipU", e.target); state.contexto = "urbano"; calcThermodynamics();
        };
        container.querySelector("#chipVerde").onclick = (e) => {
            setActiveChip("chipU", e.target); state.contexto = "verde"; calcThermodynamics();
        };

        function setActiveChip(group, target) {
            if (group === "chip") container.querySelectorAll("#chipCerrado, #chipSertao, #chipLitoral, #chipSul").forEach(b => b.classList.remove("active"));
            if (group === "chipV") container.querySelectorAll("#chipVerao, #chipInverno").forEach(b => b.classList.remove("active"));
            if (group === "chipU") container.querySelectorAll("#chipUrbano, #chipVerde").forEach(b => b.classList.remove("active"));
            target.classList.add("active");
            if (window.soundEngine) window.soundEngine.playDial();
        }

        const selTelhado = container.querySelector("#selTelhado");
        const selForro = container.querySelector("#selForro");
        const selParede = container.querySelector("#selParede");
        const selVentilacao = container.querySelector("#selVentilacao");

        selTelhado.onchange = () => { state.telhado = selTelhado.value; calcThermodynamics(); };
        selForro.onchange = () => { state.forro = selForro.value; calcThermodynamics(); };
        selParede.onchange = () => { state.parede = selParede.value; calcThermodynamics(); };
        selVentilacao.onchange = () => { state.ventilacao = selVentilacao.value; calcThermodynamics(); };

        let tFora = 38;
        let tDentro = 24;

        const calcThermodynamics = () => {
            // Temperatura Base pelo Bioma e Estação
            let base = 35;
            if (state.bioma === "sertao") base = 39;
            if (state.bioma === "litoral") base = 33;
            if (state.bioma === "sul") base = 28;

            if (state.estacao === "inverno") {
                base -= (state.bioma === "sul" ? 16 : 8);
            }

            // Contexto urbano
            if (state.contexto === "urbano") base += 4;
            if (state.contexto === "verde") base -= 3;

            tFora = Math.round(base);

            // Modificadores da Casa
            let red = 0;
            // Telhado
            if (state.telhado === "fibrocimento") red -= 3; // esquenta mais
            if (state.telhado === "branco") red += 5;
            if (state.telhado === "verde") red += 6;
            if (state.telhado === "ceramica") red += 4;

            // Forro
            if (state.forro === "nenhum") red -= 4; // sem forro esquenta
            if (state.forro === "tetrapak") red += 5;
            if (state.forro === "isopor") red += 5;
            if (state.forro === "duplo") red += 6;

            // Parede
            if (state.parede === "escura") red -= 3;
            if (state.parede === "branca") red += 3;
            if (state.parede === "adobe") red += 4;

            // Ventilação
            if (state.ventilacao === "unica") red -= 2;
            if (state.ventilacao === "cruzada") red += 3;
            if (state.ventilacao === "lanternim") red += 4;

            tDentro = Math.round(tFora - red);

            // Atualiza UI
            container.querySelector("#dispTempFora").innerText = `${tFora}°C`;
            container.querySelector("#dispTempDentro").innerText = `${tDentro}°C`;

            const confortoTxt = container.querySelector("#dispConfortoTxt");
            const economia = container.querySelector("#dispEconomia");
            const feedback = container.querySelector("#houseFeedback");

            if (tDentro >= 22 && tDentro <= 26) {
                confortoTxt.innerText = "🟢 Conforto Ideal!";
                confortoTxt.style.color = "#10b981";
                container.querySelector("#dispTempDentro").style.color = "#10b981";
                economia.innerText = "100%";
                economia.style.color = "#10b981";
                feedback.innerHTML = `
                    <p class="text-success"><strong>🎉 EXCELENTE PROJETO!</strong> Sua casa no <strong>${state.bioma.toUpperCase()}</strong> no <strong>${state.estacao.toUpperCase()}</strong> está a <strong>${tDentro}°C</strong>!
                    Os raios do sol foram refletidos, o calor foi barrado pelo forro e a ventilação cruzada expulsou o ar quente. Nenhuma família vai precisar pagar conta de luz cara para ter conforto térmico!</p>
                `;
            } else if (tDentro > 26 && tDentro <= 30) {
                confortoTxt.innerText = "🟡 Levemente Abafado";
                confortoTxt.style.color = "#f59e0b";
                container.querySelector("#dispTempDentro").style.color = "#f59e0b";
                economia.innerText = "60%";
                economia.style.color = "#f59e0b";
                feedback.innerHTML = `<p>A casa está a ${tDentro}°C. Experimente colocar uma manta de caixa de leite, pintar o telhado de branco ou abrir janelas cruzadas para abaixar mais a temperatura.</p>`;
            } else if (tDentro > 30) {
                confortoTxt.innerText = "🔥 Forno Insuportável!";
                confortoTxt.style.color = "#ef4444";
                container.querySelector("#dispTempDentro").style.color = "#ef4444";
                economia.innerText = "0% (Ar-condicionado no máximo)";
                economia.style.color = "#ef4444";
                feedback.innerHTML = `<p class="text-danger">A casa virou uma estufa a ${tDentro}°C! Sem forro ou com telhado escuro, o calor sufoca os moradores. Adicione telhado reflexivo e forro prateado imediatamente!</p>`;
            } else {
                confortoTxt.innerText = "❄️ Frio Desconfortável";
                confortoTxt.style.color = "#0284c7";
                container.querySelector("#dispTempDentro").style.color = "#0284c7";
                economia.innerText = "80%";
            }
        };

        const drawHouseCanvas = () => {
            // Céu pelo Bioma
            let skyColor = "#38bdf8";
            if (state.bioma === "sertao") skyColor = "#67e8f9";
            if (state.bioma === "sul" && state.estacao === "inverno") skyColor = "#94a3b8";
            ctx.fillStyle = skyColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Sol
            ctx.fillStyle = state.estacao === "verao" ? "#facc15" : "#fed7aa";
            ctx.beginPath();
            ctx.arc(80, 50, 35, 0, Math.PI * 2);
            ctx.fill();

            // Chão do Bioma
            let groundColor = "#4ade80"; // grama
            if (state.bioma === "sertao") groundColor = "#d97706"; // terra seca
            if (state.contexto === "urbano") groundColor = "#334155"; // asfalto
            ctx.fillStyle = groundColor;
            ctx.fillRect(0, 180, canvas.width, 80);

            // Casa (Corte Transversal)
            const hx = 280;
            const hy = 100;

            // Paredes
            let wallColor = "#cbd5e1";
            if (state.parede === "escura") wallColor = "#475569";
            if (state.parede === "branca") wallColor = "#f8fafc";
            if (state.parede === "adobe") wallColor = "#b45309";

            ctx.fillStyle = wallColor;
            ctx.fillRect(hx, hy, 280, 90);

            // Ar interno
            ctx.fillStyle = tDentro > 28 ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.25)";
            ctx.fillRect(hx + 10, hy + 10, 260, 75);

            // Telhado
            let roofColor = "#78350f";
            if (state.telhado === "fibrocimento") roofColor = "#475569";
            if (state.telhado === "branco") roofColor = "#f8fafc";
            if (state.telhado === "verde") roofColor = "#15803d";
            if (state.telhado === "ceramica") roofColor = "#b45309";

            ctx.fillStyle = roofColor;
            ctx.beginPath();
            ctx.moveTo(hx - 20, hy);
            ctx.lineTo(hx + 140, hy - 55);
            ctx.lineTo(hx + 300, hy);
            ctx.fill();
            ctx.strokeStyle = "#0f172a";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Forro
            if (state.forro === "tetrapak") {
                ctx.strokeStyle = "#e2e8f0"; // prateado
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(hx, hy + 2);
                ctx.lineTo(hx + 140, hy - 48);
                ctx.lineTo(hx + 280, hy + 2);
                ctx.stroke();
            } else if (state.forro === "isopor" || state.forro === "duplo") {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(hx, hy, 280, 8);
            }

            // Janelas e Ventilação
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(hx + 30, hy + 30, 40, 40); // janela 1
            if (state.ventilacao === "cruzada") {
                ctx.fillRect(hx + 210, hy + 30, 40, 40); // janela 2 oposta
                // Setas de vento animadas
                ctx.strokeStyle = "#0284c7";
                ctx.lineWidth = 3;
                const wx = (Date.now() / 8) % 240;
                ctx.beginPath();
                ctx.moveTo(hx + 10 + wx, hy + 50);
                ctx.lineTo(hx + 35 + wx, hy + 50);
                ctx.stroke();
            }
            if (state.ventilacao === "lanternim") {
                ctx.fillStyle = "#fef08a";
                ctx.fillRect(hx + 125, hy - 65, 30, 12);
            }

            // Indicador de Temperatura na Casa
            ctx.fillStyle = "#0f172a";
            ctx.font = "bold 16px sans-serif";
            ctx.fillText(`Interior: ${tDentro}°C`, hx + 95, hy + 55);

            this.animFrameId = requestAnimationFrame(drawHouseCanvas);
        };
        drawHouseCanvas();
        calcThermodynamics();

        container.querySelector("#btnAprovarCasa").onclick = () => {
            if (tDentro >= 22 && tDentro <= 26) {
                if (window.soundEngine) window.soundEngine.playSuccess();
                setTimeout(() => onComplete(), 1500);
            } else {
                if (window.soundEngine) window.soundEngine.playError();
                alert(`A temperatura interna atual está em ${tDentro}°C! Ajuste os materiais para deixá-la entre 22°C e 26°C antes de aprovar.`);
            }
        };
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 3: CALORIMETRIA DA CAIXA DE LEITE
    // -------------------------------------------------------------
    renderIsolamentoSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-dashboard">
                <div class="meter-column">
                    <div class="meter-card">
                        <span class="meter-label">O que colocar debaixo da telha?</span>
                        <select id="selIsolante" class="select-retro">
                            <option value="nenhum">Sem nada (Telha crua fervendo)</option>
                            <option value="tetrapak" selected>Caixas de Leite Abertas (Lado prateado)</option>
                            <option value="isopor">Placas de Isopor Reciclado</option>
                        </select>
                    </div>
                    <div class="meter-card">
                        <span class="meter-label">Lá fora no Sol: 38°C</span>
                        <div class="temp-display" id="dispTempInterna">27°C</div>
                        <div class="meter-status" id="dispConforto">😊 Quarto Agradável e Fresquinho</div>
                    </div>
                </div>
                <div class="house-column">
                    <canvas id="houseCanvas" width="400" height="220"></canvas>
                </div>
            </div>
            <div class="sim-feedback-card" id="isoFeedback">
                <p>Veja como o lado prateado das caixas de leite funciona como um espelho de calor, jogando o calor do teto de volta para cima!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Prático: Quantas Vezes Menos Calor?</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="isoOptions"></div>
            </div>
        `;

        const sel = container.querySelector("#selIsolante");
        const dispTemp = container.querySelector("#dispTempInterna");
        const dispConf = container.querySelector("#dispConforto");
        const hCanvas = container.querySelector("#houseCanvas");
        const hCtx = hCanvas.getContext("2d");
        const feedback = container.querySelector("#isoFeedback");

        const updateHouse = () => {
            const val = sel.value;
            let temp = 27;
            let confTxt = "😊 Quarto Agradável e Fresquinho";
            let confColor = "#10b981";

            if (val === "nenhum") {
                temp = 36;
                confTxt = "🔥 Estufa Abafada (Impossível dormir!)";
                confColor = "#ef4444";
            } else if (val === "isopor") {
                temp = 26;
                confTxt = "❄️ Quarto bem fresquinho!";
                confColor = "#0284c7";
            }

            dispTemp.innerText = `${temp}°C dentro do quarto`;
            dispTemp.style.color = confColor;
            dispConf.innerText = confTxt;
            dispConf.style.color = confColor;

            hCtx.fillStyle = "#0f172a";
            hCtx.fillRect(0, 0, hCanvas.width, hCanvas.height);

            hCtx.fillStyle = "#cbd5e1";
            hCtx.fillRect(90, 95, 220, 95);

            hCtx.fillStyle = "#38bdf8";
            hCtx.fillRect(115, 115, 40, 40);

            hCtx.fillStyle = "#b45309";
            hCtx.beginPath();
            hCtx.moveTo(70, 95);
            hCtx.lineTo(200, 40);
            hCtx.lineTo(330, 95);
            hCtx.fill();

            if (val === "tetrapak") {
                hCtx.strokeStyle = "#e2e8f0";
                hCtx.lineWidth = 6;
                hCtx.beginPath();
                hCtx.moveTo(80, 93);
                hCtx.lineTo(200, 45);
                hCtx.lineTo(320, 93);
                hCtx.stroke();

                hCtx.fillStyle = "#facc15";
                hCtx.font = "bold 13px sans-serif";
                hCtx.fillText("Calor Rebatido ⤴", 140, 30);
            } else if (val === "isopor") {
                hCtx.fillStyle = "#ffffff";
                hCtx.fillRect(85, 90, 230, 8);
            }

            hCtx.fillStyle = val === "nenhum" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.25)";
            hCtx.fillRect(90, 95, 220, 95);
        };

        sel.onchange = () => {
            if (window.soundEngine) window.soundEngine.playDial();
            updateHouse();
        };
        updateHouse();

        const optsContainer = container.querySelector("#isoOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = op.valor;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 SENSACIONAL!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente de novo:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 4: MAKER DO POST EM PIXEL ART (LAYOUT LIMPO)
    // -------------------------------------------------------------
    renderPixelArtMaker(container, missao, onComplete) {
        container.innerHTML = `
            <div class="maker-clean-panel">
                <div class="pixel-art-header-box">
                    <span style="font-size: 32px;">🏡☀️🌱</span>
                    <div>
                        <strong>CASA FRESQUINHA SEM GASTAR LUZ</strong>
                        <div style="font-size: 12px; color: #fef08a; margin-top: 4px;">Dicas Comunitárias de Arquitetura Térmica</div>
                    </div>
                </div>
                <p class="maker-instructions-prompt">
                    Escolha as <strong>3 soluções práticas</strong> para postar nas redes da vizinhança:
                </p>
                <div class="maker-blocks-pool" id="poolCardsPixel"></div>
                <div class="maker-action-bar">
                    <div class="maker-counter-badge" id="pixelCounter">Dicas selecionadas: 0 de 3</div>
                    <button class="btn-retro success" id="btnPublicarPixel" disabled>
                        Publicar Post Comunitário
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="pixelFeedback" style="margin-top: 14px;"></div>
        `;

        const pool = container.querySelector("#poolCardsPixel");
        const btnPublicar = container.querySelector("#btnPublicarPixel");
        const counter = container.querySelector("#pixelCounter");
        const feedback = container.querySelector("#pixelFeedback");

        const selected = new Set();
        const shuffled = shuffleArray(missao.cardsSolucao);

        shuffled.forEach(item => {
            const card = document.createElement("div");
            card.className = "maker-block-item";
            card.innerHTML = `<span class="item-check-icon">⬜</span> <div><strong>${item.solucao}</strong><br><small style="color: #475569;">${item.justificativa}</small></div>`;
            card.onclick = () => {
                if (selected.has(item.id)) {
                    selected.delete(item.id);
                    card.classList.remove("selected");
                    card.querySelector(".item-check-icon").innerText = "⬜";
                } else {
                    if (selected.size >= 3) {
                        feedback.innerHTML = "<p class='text-danger'>Você já escolheu 3 dicas. Clique em uma para desmarcar se quiser trocar.</p>";
                        return;
                    }
                    selected.add(item.id);
                    card.classList.add("selected");
                    card.querySelector(".item-check-icon").innerText = "✅";
                }
                if (window.soundEngine) window.soundEngine.playDial();
                counter.innerText = `Dicas selecionadas: ${selected.size} de 3`;
                btnPublicar.disabled = selected.size !== 3;
            };
            pool.appendChild(card);
        });

        btnPublicar.onclick = () => {
            const selArray = Array.from(selected);
            const allValid = selArray.every(id => {
                const item = missao.cardsSolucao.find(x => x.id === id);
                return item.valido === true;
            });

            if (allValid) {
                feedback.innerHTML = `<p class="text-success"><strong>🎉 Post Bombando nas Redes!</strong> Dicas fáceis que vão ajudar todo mundo a deixar as casas frescas sem gastar quase nada!</p>`;
                if (window.soundEngine) window.soundEngine.playSuccess();
                setTimeout(() => onComplete(), 1500);
            } else {
                feedback.innerHTML = `<p class="text-danger"><strong>❌ Cuidado:</strong> Você selecionou uma opção que deixaria a casa ainda mais quente! Remova e escolha as dicas corretas.</p>`;
                if (window.soundEngine) window.soundEngine.playError();
            }
        };
    }

    // -------------------------------------------------------------
    // 3º ANO - FASE 1: ESPECTRO - ONDAS SEGURAS VS ONDAS PERIGOSAS
    // -------------------------------------------------------------
    renderEspectroSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="spectrum-interactive">
                <div class="spectrum-bar">
                    <div class="spec-zone non-ionizing">
                        <span>ONDAS FRACAS E 100% SEGURAS (Não machucam o corpo)</span>
                        <div class="spec-labels">
                            <span>Rádio do Carro</span>
                            <span>Wi-Fi da Sala</span>
                            <span>Celular / 5G</span>
                            <span>Luz da Lâmpada</span>
                        </div>
                    </div>
                    <div class="spec-boundary">⚠️ Limite de Perigo</div>
                    <div class="spec-zone ionizing">
                        <span>RADIAÇÃO FORTE (Perigosa)</span>
                        <div class="spec-labels">
                            <span>Raios-X de Hospital</span>
                            <span>Radiação Nuclear</span>
                        </div>
                    </div>
                </div>
                <div class="spectrum-inspector">
                    <div class="inspector-badge">Esclarecendo de Vez:</div>
                    <p>O 5G e o Wi-Fi são apenas ondas de rádio comuns feitas para carregar vídeos e mensagens pelo ar. Elas são <strong>um milhão de vezes mais fracas</strong> do que a energia necessária para quebrar uma molécula do corpo humano!</p>
                </div>
            </div>
            <div class="sim-feedback-card" id="espectroFeedback">
                <p>Observe a régua acima e responda qual tipo de radiação realmente exige cuidado e proteção.</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Pergunta Rápida: Segurança das Ondas</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="espectroOptions"></div>
            </div>
        `;

        const feedback = container.querySelector("#espectroFeedback");
        const optsContainer = container.querySelector("#espectroOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);

        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = op.valor;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 CERTÍSSIMO!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Incorreto:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 3º ANO - FASE 2: TAMANHO DAS ONDAS E ANTENAS DO CELULAR
    // -------------------------------------------------------------
    renderAntenaSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-dashboard">
                <div class="meter-column">
                    <div class="meter-card">
                        <span class="meter-label">Escolha o Tipo de Onda:</span>
                        <div class="freq-buttons">
                            <button class="btn-retro sm active" id="btnFreq3Ghz">5G: Onda Curtinha</button>
                            <button class="btn-retro sm" id="btnFreq24Ghz">Wi-Fi: Onda Média</button>
                            <button class="btn-retro sm" id="btnFreq700Mhz">Rádio Antigo: Onda Longa</button>
                        </div>
                    </div>
                    <div class="meter-card">
                        <span class="meter-label">Tamanho da Onda:</span>
                        <div class="force-display" id="dispLambda">10 centímetros</div>
                        <div class="meter-status" id="dispAntenaTamanho">📏 Tamanho da Antena: 2,5 cm (Cabe dentro do celular!)</div>
                    </div>
                </div>
                <div class="wave-column">
                    <canvas id="waveCanvas" width="400" height="220"></canvas>
                </div>
            </div>
            <div class="sim-feedback-card" id="antenaFeedback">
                <p>Veja a onda oscilando na tela: quanto mais rápida a internet, <strong>menor é a onda</strong> e <strong>menor é a anteninha</strong> que precisa ficar dentro do celular!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Prático: O Tamanho da Anteninha</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="antenaOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#waveCanvas");
        const ctx = canvas.getContext("2d");
        const dispLambda = container.querySelector("#dispLambda");
        const dispAntena = container.querySelector("#dispAntenaTamanho");
        const feedback = container.querySelector("#antenaFeedback");

        let waveLengthPx = 40;
        let wavePhase = 0;

        container.querySelector("#btnFreq3Ghz").onclick = (e) => {
            container.querySelectorAll(".freq-buttons button").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            waveLengthPx = 40;
            dispLambda.innerText = "10 centímetros (curtinha)";
            dispAntena.innerText = "📏 Tamanho da Antena: 2,5 cm (Cabe dentro do celular!)";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        container.querySelector("#btnFreq24Ghz").onclick = (e) => {
            container.querySelectorAll(".freq-buttons button").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            waveLengthPx = 60;
            dispLambda.innerText = "12,5 centímetros";
            dispAntena.innerText = "📏 Tamanho da Antena: 3,1 cm (Anteninha do roteador)";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        container.querySelector("#btnFreq700Mhz").onclick = (e) => {
            container.querySelectorAll(".freq-buttons button").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            waveLengthPx = 140;
            dispLambda.innerText = "43 centímetros (comprida)";
            dispAntena.innerText = "📏 Tamanho da Antena: 11 cm (Antena de metal do carro)";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const drawWave = () => {
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(20, canvas.height / 2);
            ctx.lineTo(canvas.width - 20, canvas.height / 2);
            ctx.stroke();

            ctx.strokeStyle = "#8b5cf6";
            ctx.lineWidth = 4;
            ctx.beginPath();
            for (let x = 20; x < canvas.width - 20; x++) {
                const y = canvas.height / 2 + Math.sin((x / waveLengthPx) * Math.PI * 2 - wavePhase) * 50;
                if (x === 20) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            wavePhase += 0.08;
            this.animFrameId = requestAnimationFrame(drawWave);
        };
        drawWave();

        const optsContainer = container.querySelector("#antenaOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = op.valor;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 ACERTOU!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 3º ANO - FASE 3: GRAVANDO O PODCAST (LAYOUT LIMPO)
    // -------------------------------------------------------------
    renderPodcastMaker(container, missao, onComplete) {
        container.innerHTML = `
            <div class="maker-clean-panel">
                <div class="audio-mixer-controls">
                    <div style="font-family: var(--font-pixel); font-size: 12px; margin-bottom: 12px; color: #fef08a;">🎙️ Mesa de Edição de Áudio do Podcast</div>
                    <div class="slider-row">
                        <span>Voz Principal (Clareza):</span>
                        <input type="range" min="0" max="100" value="85">
                    </div>
                    <div class="slider-row">
                        <span>Música de Fundo:</span>
                        <input type="range" min="0" max="100" value="40">
                    </div>
                    <div class="filter-row">
                        <label><input type="checkbox" checked> Filtro para Tirar Chiados</label>
                    </div>
                </div>
                <p class="maker-instructions-prompt">
                    Selecione as <strong>3 falas verdadeiras</strong> para gravar o episódio do Tech-Cast:
                </p>
                <div class="maker-blocks-pool" id="poolPautas"></div>
                <div class="maker-action-bar">
                    <div class="maker-counter-badge" id="podcastCounter">Falas selecionadas: 0 de 3</div>
                    <button class="btn-retro success" id="btnGravarPodcast" disabled>
                        Gravar Episódio de Sucesso
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="podcastFeedback" style="margin-top: 14px;"></div>
        `;

        const pool = container.querySelector("#poolPautas");
        const btnGravar = container.querySelector("#btnGravarPodcast");
        const counter = container.querySelector("#podcastCounter");
        const feedback = container.querySelector("#podcastFeedback");

        const selected = new Set();
        const shuffled = shuffleArray(missao.pautasPodcast);

        shuffled.forEach(item => {
            const card = document.createElement("div");
            card.className = "maker-block-item";
            card.innerHTML = `<span class="item-check-icon">⬜</span> <div><strong>${item.bloco}:</strong> ${item.texto}</div>`;
            card.onclick = () => {
                if (selected.has(item.id)) {
                    selected.delete(item.id);
                    card.classList.remove("selected");
                    card.querySelector(".item-check-icon").innerText = "⬜";
                } else {
                    if (selected.size >= 3) {
                        feedback.innerHTML = "<p class='text-danger'>Você já escolheu 3 falas. Clique em uma para desmarcar se quiser trocar.</p>";
                        return;
                    }
                    selected.add(item.id);
                    card.classList.add("selected");
                    card.querySelector(".item-check-icon").innerText = "✅";
                }
                if (window.soundEngine) window.soundEngine.playDial();
                counter.innerText = `Falas selecionadas: ${selected.size} de 3`;
                btnGravar.disabled = selected.size !== 3;
            };
            pool.appendChild(card);
        });

        btnGravar.onclick = () => {
            const selArray = Array.from(selected);
            const allValid = selArray.every(id => {
                const item = missao.pautasPodcast.find(x => x.id === id);
                return item.valido === true;
            });

            if (allValid) {
                feedback.innerHTML = `<p class="text-success"><strong>🎉 Episódio Gravado com Sucesso!</strong> Linguagem simples, sem boatos e que todo mundo vai adorar escutar!</p>`;
                if (window.soundEngine) window.soundEngine.playSuccess();
                setTimeout(() => onComplete(), 1500);
            } else {
                feedback.innerHTML = `<p class="text-danger"><strong>❌ Atenção:</strong> Você colocou um boato falso da internet no podcast! Desmarque o boato e use apenas as informações verdadeiras.</p>`;
                if (window.soundEngine) window.soundEngine.playError();
            }
        };
    }

    // -------------------------------------------------------------
    // NOVO: JOGO DE RELACIONAR COLUNAS (SITUAÇÕES VS EXPLICAÇÕES)
    // -------------------------------------------------------------
    renderRelacionarGame(container, missao, onComplete) {
        const totalPares = missao.paresRelacionar.length;
        let acertos = 0;
        let selectedA = null;
        let selectedB = null;

        const itemsLadoA = shuffleArray(missao.paresRelacionar.map(p => ({ id: p.id, texto: p.ladoA, parId: p.parId })));
        const itemsLadoB = shuffleArray(missao.paresRelacionar.map(p => ({ id: p.id, texto: p.ladoB, parId: p.parId })));

        container.innerHTML = `
            <div class="matching-game-container">
                <div class="matching-instructions-prompt">
                    <span style="font-size: 26px;">🔗</span>
                    <div>
                        <strong>Desafio de Conectar Ideias:</strong> Clique em um item da <strong>Coluna A (Situação Real)</strong> e depois no par correto da <strong>Coluna B (Conceito da Física)</strong>!
                    </div>
                </div>

                <div class="matching-status-bar">
                    <span class="matching-counter" id="matchingCounter">Pares conectados: 0 de ${totalPares}</span>
                    <span class="matching-hint">Ligue todas as situações às suas causas científicas</span>
                </div>

                <div class="matching-columns-grid">
                    <div class="matching-column" id="colunaLadoA">
                        <div class="matching-column-title">📋 Coluna A: Situações Cotidianas</div>
                    </div>
                    <div class="matching-column" id="colunaLadoB">
                        <div class="matching-column-title">🔬 Coluna B: Explicações da Física</div>
                    </div>
                </div>
            </div>
            <div class="sim-feedback-card" id="matchingFeedback" style="margin-top: 14px;">
                <p>Selecione um item da Coluna A e outro da Coluna B para conectar o par.</p>
            </div>
        `;

        const colAEl = container.querySelector("#colunaLadoA");
        const colBEl = container.querySelector("#colunaLadoB");
        const feedback = container.querySelector("#matchingFeedback");
        const counterEl = container.querySelector("#matchingCounter");

        const checkMatch = () => {
            if (!selectedA || !selectedB) return;

            if (selectedA.item.parId === selectedB.item.parId) {
                acertos++;
                selectedA.element.classList.remove("selected");
                selectedB.element.classList.remove("selected");
                selectedA.element.classList.add("matched");
                selectedB.element.classList.add("matched");
                selectedA.element.disabled = true;
                selectedB.element.disabled = true;

                if (window.soundEngine) window.soundEngine.playSuccess();
                feedback.innerHTML = `<p class="text-success"><strong>🎉 Par Correto!</strong> Você relacionou: <em>"${selectedA.item.texto}"</em> com o conceito físico exato!</p>`;
                counterEl.innerText = `Pares conectados: ${acertos} de ${totalPares}`;

                selectedA = null;
                selectedB = null;

                if (acertos >= totalPares) {
                    feedback.innerHTML = `<p class="text-success"><strong>🏆 PARABÉNS!</strong> Todos os ${totalPares} conceitos foram conectados com perfeição!</p>`;
                    setTimeout(() => onComplete(), 1600);
                }
            } else {
                selectedA.element.classList.add("wrong");
                selectedB.element.classList.add("wrong");
                if (window.soundEngine) window.soundEngine.playError();
                feedback.innerHTML = `<p class="text-danger"><strong>❌ Não combinam:</strong> Essa explicação não se aplica a essa situação. Tente outro par!</p>`;

                const elA = selectedA.element;
                const elB = selectedB.element;
                selectedA = null;
                selectedB = null;

                setTimeout(() => {
                    elA.classList.remove("selected", "wrong");
                    elB.classList.remove("selected", "wrong");
                }, 750);
            }
        };

        itemsLadoA.forEach(item => {
            const card = document.createElement("button");
            card.className = "matching-card card-lado-a";
            card.innerHTML = `<span class="matching-pin">📌</span> <span class="matching-text">${item.texto}</span>`;
            card.onclick = () => {
                if (card.classList.contains("matched")) return;
                if (window.soundEngine) window.soundEngine.playDial();

                if (selectedA && selectedA.element === card) {
                    card.classList.remove("selected");
                    selectedA = null;
                    return;
                }
                if (selectedA) selectedA.element.classList.remove("selected");
                card.classList.add("selected");
                selectedA = { element: card, item };

                checkMatch();
            };
            colAEl.appendChild(card);
        });

        itemsLadoB.forEach(item => {
            const card = document.createElement("button");
            card.className = "matching-card card-lado-b";
            card.innerHTML = `<span class="matching-pin">💡</span> <span class="matching-text">${item.texto}</span>`;
            card.onclick = () => {
                if (card.classList.contains("matched")) return;
                if (window.soundEngine) window.soundEngine.playDial();

                if (selectedB && selectedB.element === card) {
                    card.classList.remove("selected");
                    selectedB = null;
                    return;
                }
                if (selectedB) selectedB.element.classList.remove("selected");
                card.classList.add("selected");
                selectedB = { element: card, item };

                checkMatch();
            };
            colBEl.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // NOVO: JOGO DE COMPLETAR LACUNAS DE FRASES CIENTÍFICAS
    // -------------------------------------------------------------
    renderCompletarGame(container, missao, onComplete) {
        const { frases, bancoPalavras } = missao.lacunasData;
        const total = frases.length;
        const userAnswers = new Array(total).fill(null);
        let activeSlot = 0;

        const shuffledWords = shuffleArray(bancoPalavras);

        container.innerHTML = `
            <div class="fill-blanks-container">
                <div class="fill-header-prompt">
                    <span style="font-size: 26px;">🧩</span>
                    <div>
                        <strong>Complete as Lacunas Científicas:</strong> Clique em uma lacuna vazia <code>[ ? ]</code> e depois clique na palavra certa no banco abaixo!
                    </div>
                </div>

                <div class="sentences-list" id="sentencesList"></div>

                <div class="word-bank-section">
                    <div class="word-bank-title">📚 Banco de Palavras Disponíveis (Clique para encaixar):</div>
                    <div class="word-chips-grid" id="wordChipsGrid"></div>
                </div>

                <div class="fill-action-bar">
                    <div class="fill-counter-badge" id="fillCounter">Lacunas preenchidas: 0 de ${total}</div>
                    <button class="btn-retro success" id="btnValidarLacunas" disabled>
                        Verificar e Validar Frases
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="fillFeedback" style="margin-top: 14px;">
                <p>Encaixe todas as palavras nas 4 frases para poder validar suas respostas.</p>
            </div>
        `;

        const sentListEl = container.querySelector("#sentencesList");
        const chipsGridEl = container.querySelector("#wordChipsGrid");
        const counterEl = container.querySelector("#fillCounter");
        const btnValidar = container.querySelector("#btnValidarLacunas");
        const feedback = container.querySelector("#fillFeedback");

        const updateUI = () => {
            sentListEl.innerHTML = "";
            frases.forEach((f, idx) => {
                const sCard = document.createElement("div");
                sCard.className = "sentence-card";

                const filledWord = userAnswers[idx];
                const isActive = activeSlot === idx;

                let slotHTML = "";
                if (filledWord) {
                    slotHTML = `<button class="slot-btn filled ${isActive ? 'active' : ''}" data-idx="${idx}">${filledWord} <span class="slot-remove">✕</span></button>`;
                } else {
                    slotHTML = `<button class="slot-btn empty ${isActive ? 'active' : ''}" data-idx="${idx}">[ ? Inserir Palavra ]</button>`;
                }

                sCard.innerHTML = `
                    <div class="sentence-number">Frase ${idx + 1}</div>
                    <div class="sentence-text">
                        ${f.pre} ${slotHTML} ${f.pos}
                    </div>
                `;

                const slotBtn = sCard.querySelector(".slot-btn");
                slotBtn.onclick = () => {
                    if (window.soundEngine) window.soundEngine.playDial();
                    if (userAnswers[idx]) {
                        userAnswers[idx] = null;
                        activeSlot = idx;
                    } else {
                        activeSlot = idx;
                    }
                    updateUI();
                };

                sentListEl.appendChild(sCard);
            });

            chipsGridEl.innerHTML = "";
            shuffledWords.forEach(word => {
                const isUsed = userAnswers.includes(word);
                const chip = document.createElement("button");
                chip.className = `word-chip ${isUsed ? 'used' : ''}`;
                chip.innerText = word;
                chip.disabled = isUsed;

                chip.onclick = () => {
                    if (isUsed) return;
                    if (window.soundEngine) window.soundEngine.playDial();

                    let targetSlot = activeSlot;
                    if (targetSlot === null || userAnswers[targetSlot] !== null) {
                        targetSlot = userAnswers.findIndex(ans => ans === null);
                    }

                    if (targetSlot !== -1) {
                        userAnswers[targetSlot] = word;
                        const nextEmpty = userAnswers.findIndex(ans => ans === null);
                        activeSlot = nextEmpty !== -1 ? nextEmpty : null;
                        updateUI();
                    }
                };

                chipsGridEl.appendChild(chip);
            });

            const filledCount = userAnswers.filter(a => a !== null).length;
            counterEl.innerText = `Lacunas preenchidas: ${filledCount} de ${total}`;
            btnValidar.disabled = filledCount !== total;
        };

        btnValidar.onclick = () => {
            let todosCertos = true;
            const slots = container.querySelectorAll(".slot-btn");

            frases.forEach((f, idx) => {
                const correta = f.palavra;
                const resposta = userAnswers[idx];
                const btn = slots[idx];

                if (resposta === correta) {
                    btn.classList.add("correct");
                    btn.classList.remove("wrong");
                } else {
                    todosCertos = false;
                    btn.classList.add("wrong");
                    btn.classList.remove("correct");
                }
            });

            if (todosCertos) {
                feedback.innerHTML = `<p class="text-success"><strong>🎉 TODAS CORRETAS!</strong> Você completou todas as frases com a terminologia física exata!</p>`;
                if (window.soundEngine) window.soundEngine.playSuccess();
                setTimeout(() => onComplete(), 1600);
            } else {
                feedback.innerHTML = `<p class="text-danger"><strong>❌ Algumas palavras estão no lugar errado:</strong> Clique nas palavras marcadas em vermelho para devolvê-las ao banco e tentar de novo!</p>`;
                if (window.soundEngine) window.soundEngine.playError();
            }
        };

        updateUI();
    }

    // -------------------------------------------------------------
    // NOVO: CLASSIFICAR BONS CONDUTORES VS BONS ISOLANTES TÉRMICOS
    // -------------------------------------------------------------
    renderClassificarMateriais(container, missao, onComplete) {
        const itens = shuffleArray(missao.itensClassificar);
        const total = itens.length;
        let classificados = 0;

        container.innerHTML = `
            <div class="classify-container">
                <div class="classify-header-prompt">
                    <span style="font-size: 26px;">📦🔥🛡️</span>
                    <div>
                        <strong>Separação de Materiais:</strong> Classifique cada item do dia a dia como <strong>BOM CONDUTOR</strong> (deixa o calor passar fácil) ou <strong>BOM ISOLANTE</strong> (barra e segura o calor)!
                    </div>
                </div>

                <div class="classify-bins-grid">
                    <div class="classify-bin bin-condutor" id="binCondutores">
                        <div class="bin-header">🔥 Bons Condutores de Calor</div>
                        <div class="bin-sub">Deixam o calor passar rápido (metais, panelas)</div>
                        <div class="bin-items-list" id="listCondutores"></div>
                    </div>

                    <div class="classify-bin bin-isolante" id="binIsolantes">
                        <div class="bin-header">🛡️ Bons Isolantes de Calor</div>
                        <div class="bin-sub">Bloqueiam e barram a passagem do calor (isopor, lã)</div>
                        <div class="bin-items-list" id="listIsolantes"></div>
                    </div>
                </div>

                <div class="classify-deck-section">
                    <div class="classify-deck-header">
                        <span>Materiais para Classificar:</span>
                        <strong id="classifyCounter">Classificados: 0 de ${total}</strong>
                    </div>
                    <div class="classify-cards-grid" id="classifyCardsGrid"></div>
                </div>
            </div>
            <div class="sim-feedback-card" id="classifyFeedback" style="margin-top: 14px;">
                <p>Clique em <strong>É Condutor</strong> ou <strong>É Isolante</strong> em cada cartão.</p>
            </div>
        `;

        const cardsGrid = container.querySelector("#classifyCardsGrid");
        const listCondutores = container.querySelector("#listCondutores");
        const listIsolantes = container.querySelector("#listIsolantes");
        const counterEl = container.querySelector("#classifyCounter");
        const feedback = container.querySelector("#classifyFeedback");

        itens.forEach(item => {
            const card = document.createElement("div");
            card.className = "classify-card";
            card.innerHTML = `
                <div class="card-item-title">${item.nome}</div>
                <div class="card-item-desc">${item.desc}</div>
                <div class="card-item-buttons">
                    <button class="btn-retro sm btn-classify-action" data-cat="condutor">🔥 É Condutor</button>
                    <button class="btn-retro sm btn-classify-action" data-cat="isolante">🛡️ É Isolante</button>
                </div>
            `;

            const btns = card.querySelectorAll(".btn-classify-action");
            btns.forEach(btn => {
                btn.onclick = () => {
                    const chosen = btn.getAttribute("data-cat");
                    if (chosen === item.categoria) {
                        classificados++;
                        card.classList.add("classified-done");
                        card.innerHTML = `
                            <div class="card-done-badge">✅ ${item.nome}</div>
                            <div style="font-size: 12px; color: #166534;">Classificado como: <strong>${item.categoria === 'condutor' ? 'Condutor' : 'Isolante'}</strong></div>
                        `;

                        const binItem = document.createElement("div");
                        binItem.className = "bin-item-pill";
                        binItem.innerText = `✓ ${item.nome}`;
                        if (item.categoria === "condutor") {
                            listCondutores.appendChild(binItem);
                        } else {
                            listIsolantes.appendChild(binItem);
                        }

                        if (window.soundEngine) window.soundEngine.playSuccess();
                        feedback.innerHTML = `<p class="text-success"><strong>✓ Correto!</strong> O material <em>${item.nome}</em> é um <strong>${item.categoria === 'condutor' ? 'Bom Condutor' : 'Bom Isolante'}</strong>!</p>`;
                        counterEl.innerText = `Classificados: ${classificados} de ${total}`;

                        if (classificados >= total) {
                            feedback.innerHTML = `<p class="text-success"><strong>🏆 EXCELENTE!</strong> Você separou perfeitamente todos os condutores e isolantes térmicos!</p>`;
                            setTimeout(() => onComplete(), 1600);
                        }
                    } else {
                        card.classList.add("classify-shake");
                        if (window.soundEngine) window.soundEngine.playError();
                        feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> Lembre-se: ${item.desc}. Ele não é ${chosen === 'condutor' ? 'um condutor' : 'um isolante'}!</p>`;
                        setTimeout(() => card.classList.remove("classify-shake"), 700);
                    }
                };
            });

            cardsGrid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // NOVO: QUIZ DE CÁLCULOS DO PERITO DE TRÂNSITO
    // -------------------------------------------------------------
    renderQuizCalculos(container, missao, onComplete) {
        const perguntas = missao.perguntasQuiz;
        let qIdx = 0;

        container.innerHTML = `
            <div class="calc-perito-container">
                <div class="calc-formula-banner">
                    <span style="font-size: 26px;">📐🚗</span>
                    <div>
                        <strong>Regra Oficial do Perito de Trânsito:</strong>
                        <div class="formula-line">Distância de Reação (1s) + Distância de Freio = Distância Total de Parada</div>
                    </div>
                </div>

                <div class="calc-question-card" id="calcQuestionCard"></div>
            </div>
            <div class="sim-feedback-card" id="quizFeedback" style="margin-top: 14px;">
                <p>Analise a situação do perito e escolha o cálculo correto.</p>
            </div>
        `;

        const card = container.querySelector("#calcQuestionCard");
        const feedback = container.querySelector("#quizFeedback");

        const showQ = () => {
            const item = perguntas[qIdx];
            card.innerHTML = `
                <div class="calc-step-tag">Etapa ${qIdx + 1} de ${perguntas.length}: Investigação de Frenagem</div>
                <p class="calc-perito-question">${item.q}</p>
                <div class="calc-options" id="quizCalcOptions"></div>
            `;

            const optsEl = card.querySelector("#quizCalcOptions");
            const shuffledOpts = shuffleArray(item.opcoes);

            shuffledOpts.forEach(op => {
                const btn = document.createElement("button");
                btn.className = "btn-option";
                btn.innerText = op.valor;
                btn.onclick = () => {
                    if (op.correta) {
                        btn.classList.add("correct");
                        feedback.innerHTML = `<p class="text-success"><strong>🎉 ACERTOU!</strong> ${op.explicacao}</p>`;
                        if (window.soundEngine) window.soundEngine.playSuccess();

                        setTimeout(() => {
                            qIdx++;
                            if (qIdx < perguntas.length) {
                                showQ();
                            } else {
                                feedback.innerHTML = `<p class="text-success"><strong>🏆 PARABÉNS!</strong> Você concluiu todas as etapas da perícia de frenagem!</p>`;
                                setTimeout(() => onComplete(), 1500);
                            }
                        }, 1300);
                    } else {
                        btn.classList.add("wrong");
                        feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                        if (window.soundEngine) window.soundEngine.playError();
                    }
                };
                optsEl.appendChild(btn);
            });
        };

        showQ();
    }

    // -------------------------------------------------------------
    // NOVO: DUELO DE WI-FI 2.4 GHz VS 5.0 GHz NAS PAREDES DA CASA
    // -------------------------------------------------------------
    renderWifiComodosSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="wifi-sim-container">
                <div class="wifi-controls-bar">
                    <div class="control-segment">
                        <span>Frequência do Wi-Fi:</span>
                        <button class="btn-retro sm active" id="btnWifi5">🚀 5.0 GHz (Super Rápida)</button>
                        <button class="btn-retro sm" id="btnWifi24">🌐 2.4 GHz (Fura Paredes)</button>
                    </div>
                    <div class="control-segment">
                        <span>Onde você está com o Celular?</span>
                        <button class="btn-retro sm active" id="btnPosSala">🛋️ 1. Sala (Perto)</button>
                        <button class="btn-retro sm" id="btnPosQuarto1">🚪 2. Quarto 1 (1 Parede)</button>
                        <button class="btn-retro sm" id="btnPosQuarto2">🛏️ 3. Quarto do Fundo (2 Paredes)</button>
                    </div>
                </div>

                <div class="wifi-canvas-wrapper">
                    <canvas id="wifiCanvas" width="840" height="240"></canvas>
                </div>

                <div class="wifi-readout-panel">
                    <div class="readout-card">
                        <span class="readout-title">Sinal no Celular:</span>
                        <div class="readout-val" id="dispWifiBars">📶 4 Barras (Sinal Cheio)</div>
                    </div>
                    <div class="readout-card">
                        <span class="readout-title">Velocidade Medida:</span>
                        <div class="readout-val" id="dispWifiSpeed" style="color: #10b981;">🚀 500 Mbps</div>
                    </div>
                    <div class="readout-card">
                        <span class="readout-title">Desempenho Real:</span>
                        <div class="readout-status" id="dispWifiStatus">Filmes em 4K e jogos sem travar!</div>
                    </div>
                </div>
            </div>

            <div class="sim-feedback-card" id="wifiFeedback" style="margin-top: 14px;">
                <p>Troque de frequência e de cômodo para ver as ondas atravessando ou sendo barradas pelas paredes!</p>
            </div>

            <div class="calc-box" style="margin-top: 16px;">
                <div class="calc-badge">Desafio do Técnico de Redes</div>
                <p class="calc-question">Você precisa assistir a uma aula online lá no quarto do fundo, que fica atrás de duas paredes grossas de tijolo. Qual sinal de Wi-Fi é a melhor escolha para a conexão ficar estável e não cair?</p>
                <div class="calc-options" id="wifiOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#wifiCanvas");
        const ctx = canvas.getContext("2d");
        const dispBars = container.querySelector("#dispWifiBars");
        const dispSpeed = container.querySelector("#dispWifiSpeed");
        const dispStatus = container.querySelector("#dispWifiStatus");
        const feedback = container.querySelector("#wifiFeedback");

        let freq = "5.0";
        let room = 1;
        let wavePhase = 0;

        const updateReadout = () => {
            if (freq === "5.0") {
                if (room === 1) {
                    dispBars.innerText = "📶 4 Barras (Cheio)";
                    dispBars.style.color = "#10b981";
                    dispSpeed.innerText = "🚀 500 Mbps";
                    dispSpeed.style.color = "#10b981";
                    dispStatus.innerText = "Velocidade máxima na mesma sala do roteador!";
                } else if (room === 2) {
                    dispBars.innerText = "📶 2 Barras (Médio)";
                    dispBars.style.color = "#f59e0b";
                    dispSpeed.innerText = "⚠️ 110 Mbps";
                    dispSpeed.style.color = "#f59e0b";
                    dispStatus.innerText = "A 1ª parede de tijolo absorveu metade da onda de 5 GHz.";
                } else {
                    dispBars.innerText = "📶 1 Barra (Fraco)";
                    dispBars.style.color = "#ef4444";
                    dispSpeed.innerText = "💀 12 Mbps (Instável)";
                    dispSpeed.style.color = "#ef4444";
                    dispStatus.innerText = "A 2ª parede bloqueou quase tudo! O vídeo trava e a conexão cai.";
                }
            } else {
                if (room === 1) {
                    dispBars.innerText = "📶 4 Barras (Cheio)";
                    dispBars.style.color = "#10b981";
                    dispSpeed.innerText = "🌐 95 Mbps";
                    dispSpeed.style.color = "#10b981";
                    dispStatus.innerText = "Velocidade estável e sinal forte.";
                } else if (room === 2) {
                    dispBars.innerText = "📶 4 Barras (Bom)";
                    dispBars.style.color = "#10b981";
                    dispSpeed.innerText = "🌐 80 Mbps";
                    dispSpeed.style.color = "#10b981";
                    dispStatus.innerText = "Ondas compridas furaram a 1ª parede sem perder quase nada!";
                } else {
                    dispBars.innerText = "📶 3 Barras (Estável)";
                    dispBars.style.color = "#10b981";
                    dispSpeed.innerText = "🌐 65 Mbps (Firme)";
                    dispSpeed.style.color = "#10b981";
                    dispStatus.innerText = "Fura as 2 paredes com facilidade! Internet estável garantida.";
                }
            }
        };

        const drawWifiScene = () => {
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Cômodos (Chão)
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(20, 20, 250, 190);
            ctx.fillRect(295, 20, 250, 190);
            ctx.fillRect(570, 20, 250, 190);

            // Paredes de Tijolo
            ctx.fillStyle = "#b45309";
            ctx.fillRect(270, 20, 25, 190);
            ctx.fillRect(545, 20, 25, 190);

            // Linhas de tijolo nas paredes
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.5;
            for (let y = 30; y < 210; y += 15) {
                ctx.beginPath();
                ctx.moveTo(270, y);
                ctx.lineTo(295, y);
                ctx.moveTo(545, y);
                ctx.lineTo(570, y);
                ctx.stroke();
            }

            // Títulos dos Cômodos
            ctx.fillStyle = "#94a3b8";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText("🛋️ Sala de Estar", 35, 45);
            ctx.fillText("🚪 Quarto 1", 310, 45);
            ctx.fillText("🛏️ Quarto do Fundo", 585, 45);

            // Roteador na Sala
            const rX = 70;
            const rY = 120;
            ctx.fillStyle = "#0284c7";
            ctx.fillRect(rX - 16, rY - 10, 32, 20);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rX - 8, rY - 10);
            ctx.lineTo(rX - 12, rY - 26);
            ctx.moveTo(rX + 8, rY - 10);
            ctx.lineTo(rX + 12, rY - 26);
            ctx.stroke();

            // Ondas Wi-Fi animadas
            const waveSpacing = freq === "5.0" ? 22 : 45;
            const waveSpeed = freq === "5.0" ? 1.4 : 0.8;
            const waveColor = freq === "5.0" ? "#38bdf8" : "#a855f7";

            wavePhase = (wavePhase + waveSpeed) % waveSpacing;

            for (let r = wavePhase; r < 750; r += waveSpacing) {
                if (r < 10) continue;

                let alpha = 1.0;
                const waveRightEdge = rX + r;

                if (freq === "5.0") {
                    if (waveRightEdge > 545) {
                        alpha = 0.08;
                    } else if (waveRightEdge > 270) {
                        alpha = 0.35;
                    } else {
                        alpha = Math.max(0.2, 1 - r / 300);
                    }
                } else {
                    if (waveRightEdge > 545) {
                        alpha = 0.55;
                    } else if (waveRightEdge > 270) {
                        alpha = 0.8;
                    } else {
                        alpha = Math.max(0.3, 1 - r / 600);
                    }
                }

                ctx.strokeStyle = waveColor;
                ctx.globalAlpha = alpha;
                ctx.lineWidth = freq === "5.0" ? 2 : 3.5;
                ctx.beginPath();
                ctx.arc(rX, rY, r, -Math.PI * 0.45, Math.PI * 0.45);
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            // Desenha o Celular no cômodo ativo
            let pX = 180;
            if (room === 2) pX = 420;
            if (room === 3) pX = 700;
            const pY = 120;

            ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
            ctx.beginPath();
            ctx.arc(pX, pY, 32, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "26px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("📱", pX, pY + 9);
            ctx.textAlign = "left";

            this.animFrameId = requestAnimationFrame(drawWifiScene);
        };

        drawWifiScene();
        updateReadout();

        // Botões de Frequência
        const btnF5 = container.querySelector("#btnWifi5");
        const btnF24 = container.querySelector("#btnWifi24");
        btnF5.onclick = () => {
            btnF5.classList.add("active");
            btnF24.classList.remove("active");
            freq = "5.0";
            if (window.soundEngine) window.soundEngine.playDial();
            updateReadout();
        };
        btnF24.onclick = () => {
            btnF24.classList.add("active");
            btnF5.classList.remove("active");
            freq = "2.4";
            if (window.soundEngine) window.soundEngine.playDial();
            updateReadout();
        };

        // Botões de Cômodo
        const bPos1 = container.querySelector("#btnPosSala");
        const bPos2 = container.querySelector("#btnPosQuarto1");
        const bPos3 = container.querySelector("#btnPosQuarto2");

        const setRoom = (r, btn) => {
            [bPos1, bPos2, bPos3].forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            room = r;
            if (window.soundEngine) window.soundEngine.playDial();
            updateReadout();
        };

        bPos1.onclick = () => setRoom(1, bPos1);
        bPos2.onclick = () => setRoom(2, bPos2);
        bPos3.onclick = () => setRoom(3, bPos3);

        // Opções da Pergunta Final
        const optsContainer = container.querySelector("#wifiOptions");
        const opcoesWifi = [
            { txt: "Rede 2.4 GHz (ondas mais compridas que conseguem furar e contornar paredes)", correta: true, explicacao: "Exatamente! Ondas de frequência menor (2.4 GHz) são mais longas e sofrem muito menos perda ao atravessar obstáculos como tijolos e concreto." },
            { txt: "Rede 5.0 GHz (porque o número 5 é maior que o número 2)", correta: false, explicacao: "Cuidado! O 5 GHz tem ondas mais curtinhas que são facilmente bloqueadas por tijolos e concreto." },
            { txt: "Nenhuma das duas (as paredes apagam todo sinal do mundo)", correta: false, explicacao: "As ondas de rádio conseguem sim atravessar materiais, especialmente na frequência de 2.4 GHz." }
        ];

        const shuffledOpts = shuffleArray(opcoesWifi);
        shuffledOpts.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = op.txt;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 PERFEITO!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1600);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // FASE 4 (COMUM): BANCA DE AVALIAÇÃO FINAL COM RESPOSTAS EMBARALHADAS
    // -------------------------------------------------------------
    renderBancaDefesa(container, missao, onComplete) {
        container.innerHTML = `
            <div class="banca-container">
                <div class="banca-status-bar">
                    <span>Avaliação Bimestral - Perguntas Finais</span>
                    <span id="bancaProgresso">Pergunta 1 de ${missao.perguntasBanca.length}</span>
                </div>
                <div class="banca-card" id="bancaCard"></div>
            </div>
            <div class="sim-feedback-card" id="bancaFeedback">
                <p>Responda com atenção para fechar a nota do seu grupo!</p>
            </div>
        `;

        const card = container.querySelector("#bancaCard");
        const progresso = container.querySelector("#bancaProgresso");
        const feedback = container.querySelector("#bancaFeedback");

        let pIdx = 0;
        let acertos = 0;

        const showQuestion = () => {
            const q = missao.perguntasBanca[pIdx];
            progresso.innerText = `Pergunta ${pIdx + 1} de ${missao.perguntasBanca.length}`;

            card.innerHTML = `
                <h3 class="banca-q-title">🗣️ Pergunta da Banca:</h3>
                <p class="banca-q-text">${q.pergunta}</p>
                <div class="banca-options" id="bancaOptions"></div>
            `;

            const opts = card.querySelector("#bancaOptions");
            // EMBARALHAR AS RESPOSTAS PARA NÃO SER SEMPRE A PRIMEIRA!
            const shuffledAnswers = shuffleArray(q.respostas);

            shuffledAnswers.forEach(r => {
                const btn = document.createElement("button");
                btn.className = "btn-retro text-left full-width";
                btn.innerText = r.txt;
                btn.onclick = () => {
                    if (r.correta) {
                        acertos++;
                        btn.style.background = "#10b981";
                        btn.style.borderColor = "#059669";
                        feedback.innerHTML = "<p class='text-success'><strong>✓ Resposta Perfeita!</strong> A banca concordou plenamente.</p>";
                        if (window.soundEngine) window.soundEngine.playSuccess();
                    } else {
                        btn.style.background = "#ef4444";
                        btn.style.borderColor = "#dc2626";
                        feedback.innerHTML = "<p class='text-danger'><strong>✗ Resposta Incorreta:</strong> Preste atenção ao que foi demonstrado nas fases anteriores.</p>";
                        if (window.soundEngine) window.soundEngine.playError();
                    }

                    setTimeout(() => {
                        pIdx++;
                        if (pIdx < missao.perguntasBanca.length) {
                            showQuestion();
                        } else {
                            finishBanca();
                        }
                    }, 1200);
                };
                opts.appendChild(btn);
            });
        };

        const finishBanca = () => {
            const total = missao.perguntasBanca.length;
            const nota = Math.round((acertos / total) * 10);
            card.innerHTML = `
                <div class="banca-results">
                    <h2>🏆 Avaliação Concluída!</h2>
                    <p style="font-size: 16px; margin-top: 8px;">Acertos: <strong>${acertos} de ${total}</strong></p>
                    <div class="final-score">Nota Final do Projeto: ${nota},0 / 10,0</div>
                    <p class="p-success" style="font-size: 15px;">Parabéns a toda a equipe pelo trabalho e pela dedicação ao longo do bimestre!</p>
                </div>
            `;
            feedback.innerHTML = "<p class='text-success'><strong>Parabéns!</strong> Você concluiu todas as etapas da turma.</p>";
            setTimeout(() => onComplete(), 2000);
        };

        showQuestion();
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 3: SIMULAÇÃO DO FREIO ABS (RODAS TRAVADAS VS CONTROLE)
    // -------------------------------------------------------------
    renderAbsSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="absCanvas" width="840" height="250"></canvas>
                <div class="sim-controls">
                    <div class="control-group">
                        <span>Tecnologia de Frenagem:</span>
                        <button class="btn-retro sm active" id="btnModoSemAbs">🛑 Sem Freio ABS (Rodas Travam)</button>
                        <button class="btn-retro sm" id="btnModoComAbs">🛡️ Com Freio ABS (Anti-Travamento)</button>
                    </div>
                    <button class="btn-retro success" id="btnDispararAbs">🚨 FREAR E DESVIAR AGORA!</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="absFeedback">
                <p>Descubra o que acontece ao frear bruscamente na pista molhada com e sem freio ABS!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Científico: Atrito e Direção</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="absOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#absCanvas");
        const ctx = canvas.getContext("2d");
        const btnSemAbs = container.querySelector("#btnModoSemAbs");
        const btnComAbs = container.querySelector("#btnModoComAbs");
        const btnDisparar = container.querySelector("#btnDispararAbs");
        const feedback = container.querySelector("#absFeedback");

        let hasAbs = false;
        let carX = 60;
        let carY = 150;
        let speedX = 0;
        let speedY = 0;
        let isTesting = false;
        let isBraking = false;
        let isFinished = false;
        let skidMarks = [];
        let absPulse = 0;
        let conesHit = false;

        btnSemAbs.onclick = () => {
            hasAbs = false;
            btnSemAbs.classList.add("active");
            btnComAbs.classList.remove("active");
            feedback.innerHTML = "<p>Modo selecionado: <strong>Sem ABS</strong>. As rodas vão travar na freada brusca.</p>";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnComAbs.onclick = () => {
            hasAbs = true;
            btnComAbs.classList.add("active");
            btnSemAbs.classList.remove("active");
            feedback.innerHTML = "<p>Modo selecionado: <strong>Com ABS</strong>. O sistema solta e aperta o freio 20x por segundo, mantendo o controle direcional.</p>";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnDisparar.onclick = () => {
            carX = 60;
            carY = 150;
            speedX = 6;
            speedY = 0;
            isTesting = true;
            isBraking = false;
            isFinished = false;
            skidMarks = [];
            conesHit = false;
            feedback.innerHTML = "<p>O carro está acelerando em direção aos obstáculos na pista molhada...</p>";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const draw = () => {
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const grad = ctx.createLinearGradient(0, 50, 0, 220);
            grad.addColorStop(0, "#1e293b");
            grad.addColorStop(0.5, "#334155");
            grad.addColorStop(1, "#0f172a");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 60, canvas.width, 160);

            ctx.fillStyle = "#94a3b8";
            for (let x = 0; x < canvas.width; x += 60) {
                ctx.fillRect(x, 138, 35, 4);
            }

            ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
            ctx.beginPath();
            ctx.ellipse(320, 155, 70, 15, 0, 0, Math.PI * 2);
            ctx.ellipse(520, 145, 60, 12, 0, 0, Math.PI * 2);
            ctx.fill();

            const coneX = 640;
            const cones = [
                { x: coneX, y: 135 },
                { x: coneX + 25, y: 155 },
                { x: coneX + 50, y: 145 },
                { x: coneX + 75, y: 165 }
            ];

            cones.forEach(c => {
                ctx.save();
                if (conesHit && !hasAbs) {
                    ctx.translate(c.x + 20, c.y - 15);
                    ctx.rotate(0.6);
                } else {
                    ctx.translate(c.x, c.y);
                }
                ctx.fillStyle = "#ea580c";
                ctx.fillRect(-10, 0, 20, 4);
                ctx.beginPath();
                ctx.moveTo(-8, 0);
                ctx.lineTo(8, 0);
                ctx.lineTo(0, -24);
                ctx.closePath();
                ctx.fillStyle = "#f97316";
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.moveTo(-5, -6);
                ctx.lineTo(5, -6);
                ctx.lineTo(3, -14);
                ctx.lineTo(-3, -14);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });

            skidMarks.forEach(pt => {
                ctx.fillStyle = pt.color;
                ctx.fillRect(pt.x, pt.y, 8, 4);
            });

            if (isTesting && !isFinished) {
                carX += speedX;
                carY += speedY;

                if (carX >= 320 && !isBraking) {
                    isBraking = true;
                    if (window.soundEngine) window.soundEngine.playCrash();
                }

                if (isBraking) {
                    if (!hasAbs) {
                        skidMarks.push({ x: carX - 10, y: carY + 8, color: "rgba(0,0,0,0.6)" });
                        skidMarks.push({ x: carX - 10, y: carY - 8, color: "rgba(0,0,0,0.6)" });
                        speedX -= 0.05;
                        if (speedX < 2) speedX = 2;

                        if (carX >= 600) {
                            conesHit = true;
                            isFinished = true;
                            speedX = 0;
                            feedback.innerHTML = `
                                <p class="text-danger">
                                    <strong>💥 COLISÃO FATAL NOS CONES!</strong><br>
                                    As rodas travaram completamente! O atrito cinético fez o pneu esquentar e deslizar na água sem aderência direcional. Mesmo virando o volante, o carro seguiu em linha reta desgovernado!
                                </p>
                            `;
                            if (window.soundEngine) window.soundEngine.playError();
                        }
                    } else {
                        absPulse = (absPulse + 1) % 6;
                        if (absPulse < 3) {
                            skidMarks.push({ x: carX - 10, y: carY + 8, color: "rgba(56,189,248,0.4)" });
                        }
                        if (carY > 90) {
                            speedY = -1.8;
                        } else {
                            speedY = 0;
                        }
                        speedX -= 0.07;
                        if (speedX <= 0) {
                            speedX = 0;
                            speedY = 0;
                            isFinished = true;
                            feedback.innerHTML = `
                                <p class="text-success">
                                    <strong>🛡️ DESVIO PERFEITO SEM TOCAR EM NADA!</strong><br>
                                    O ABS pulsou o freio 20 vezes por segundo, impedindo o travamento das rodas! Como os pneus continuaram rolando, o motorista manteve 100% do controle do volante e desviou do obstáculo com segurança!
                                </p>
                            `;
                            if (window.soundEngine) window.soundEngine.playSuccess();
                        }
                    }
                }
            }

            ctx.save();
            ctx.translate(carX, carY);
            ctx.fillStyle = hasAbs ? "#10b981" : "#ef4444";
            ctx.fillRect(-35, -16, 70, 32);
            ctx.fillStyle = "#0284c7";
            ctx.fillRect(-15, -12, 35, 24);
            ctx.fillStyle = "#fef08a";
            ctx.fillRect(32, -14, 4, 8);
            ctx.fillRect(32, 6, 4, 8);
            ctx.fillStyle = isBraking ? "#ff0000" : "#991b1b";
            ctx.fillRect(-36, -14, 3, 7);
            ctx.fillRect(-36, 7, 3, 7);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(-24, -20, 14, 5);
            ctx.fillRect(14, -20, 14, 5);
            ctx.fillRect(-24, 15, 14, 5);
            ctx.fillRect(14, 15, 14, 5);
            ctx.restore();

            if (isBraking && hasAbs && !isFinished) {
                ctx.fillStyle = "#10b981";
                ctx.font = "bold 13px sans-serif";
                ctx.fillText("⚡ SISTEMA ABS ATIVO (PULSOS: 20x/segundo)", 20, 32);
            } else if (isBraking && !hasAbs && !isFinished) {
                ctx.fillStyle = "#ef4444";
                ctx.font = "bold 13px sans-serif";
                ctx.fillText("⚠️ RODAS TRAVADAS! PERDA TOTAL DE DIREÇÃO!", 20, 32);
            }

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#absOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 RESPOSTA EXATA!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // JOGO DE CLASSIFICAR: MITOS PERIGOSOS VS FATOS COMPROVADOS
    // (Utilizado no 1º, 2º e 3º Anos)
    // -------------------------------------------------------------
    renderClassificarFatos(container, missao, onComplete) {
        const itens = shuffleArray(missao.itensClassificar);
        const total = itens.length;
        let classificados = 0;

        container.innerHTML = `
            <div class="classify-container">
                <div class="classify-header-prompt">
                    <span style="font-size: 26px;">⚖️🧠🛡️</span>
                    <div>
                        <strong>Desafio de Mitos e Fatos:</strong> Separe as crenças erradas do cotidiano dos fatos científicos comprovados pela física!
                    </div>
                </div>

                <div class="classify-bins-grid">
                    <div class="classify-bin bin-fato" id="binFatos">
                        <div class="bin-header">${missao.tituloBinA || "✅ Fatos Comprovados pela Física"}</div>
                        <div class="bin-sub">${missao.subBinA || "Leis comprovadas e condutas seguras"}</div>
                        <div class="bin-items-list" id="listFatos"></div>
                    </div>

                    <div class="classify-bin bin-mito" id="binMitos">
                        <div class="bin-header">${missao.tituloBinB || "❌ Mitos Perigosos do Cotidiano"}</div>
                        <div class="bin-sub">${missao.subBinB || "Boatos e crenças falsas que causam problemas"}</div>
                        <div class="bin-items-list" id="listMitos"></div>
                    </div>
                </div>

                <div class="classify-deck-section">
                    <div class="classify-deck-header">
                        <span>Afirmações para Analisar:</span>
                        <strong id="fatosCounter">Classificados: 0 de ${total}</strong>
                    </div>
                    <div class="classify-cards-grid" id="fatosCardsGrid"></div>
                </div>
            </div>
            <div class="sim-feedback-card" id="fatosFeedback" style="margin-top: 14px;">
                <p>Clique em <strong>É Fato</strong> ou <strong>É Mito</strong> em cada afirmação abaixo.</p>
            </div>
        `;

        const cardsGrid = container.querySelector("#fatosCardsGrid");
        const listFatos = container.querySelector("#listFatos");
        const listMitos = container.querySelector("#listMitos");
        const counterEl = container.querySelector("#fatosCounter");
        const feedback = container.querySelector("#fatosFeedback");

        itens.forEach(item => {
            const card = document.createElement("div");
            card.className = "classify-card";
            card.innerHTML = `
                <div class="card-item-title">${item.nome}</div>
                <div class="card-item-buttons">
                    <button class="btn-retro sm btn-classify-action fato" data-cat="fato">✅ É Fato</button>
                    <button class="btn-retro sm btn-classify-action mito" data-cat="mito">❌ É Mito</button>
                </div>
            `;

            const btns = card.querySelectorAll(".btn-classify-action");
            btns.forEach(btn => {
                btn.onclick = () => {
                    const chosen = btn.getAttribute("data-cat");
                    if (chosen === item.categoria) {
                        classificados++;
                        card.classList.add("classified-done");
                        card.innerHTML = `
                            <div class="card-done-badge">${item.categoria === 'fato' ? '✅ FATO COMPROVADO' : '❌ MITO DESMASCARADO'}</div>
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px;">${item.nome}</div>
                            <div style="font-size: 12px; color: #166534; margin-top: 4px; line-height: 1.4;">${item.desc}</div>
                        `;

                        const binItem = document.createElement("div");
                        binItem.className = "bin-item-pill";
                        binItem.innerText = `✓ ${item.nome.substring(0, 36)}...`;
                        if (item.categoria === "fato") {
                            listFatos.appendChild(binItem);
                        } else {
                            listMitos.appendChild(binItem);
                        }

                        counterEl.innerText = `Classificados: ${classificados} de ${total}`;
                        feedback.innerHTML = `<p class="text-success"><strong>✓ Correto!</strong> ${item.desc}</p>`;
                        if (window.soundEngine) window.soundEngine.playSuccess();

                        if (classificados === total) {
                            feedback.innerHTML = `<p class="text-success"><strong>🎉 Sensacional!</strong> Você desmascarou todos os mitos e separou as verdades científicas com 100% de precisão!</p>`;
                            setTimeout(() => onComplete(), 1600);
                        }
                    } else {
                        card.classList.add("classify-shake");
                        setTimeout(() => card.classList.remove("classify-shake"), 400);
                        feedback.innerHTML = `<p class="text-danger"><strong>❌ Cuidado:</strong> Essa afirmação é ${item.categoria === 'fato' ? 'um FATO verdadeiro' : 'um MITO perigoso'}! ${item.desc}</p>`;
                        if (window.soundEngine) window.soundEngine.playError();
                    }
                };
            });
            cardsGrid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 1º ANO - FASE 9: POR QUE OS CARROS MODERNOS AMASSAM?
    // (Zonas de Deformação Programada vs Carro Rígido)
    // -------------------------------------------------------------
    renderDeformacaoSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="deformCanvas" width="840" height="250"></canvas>
                <div class="sim-controls">
                    <div class="control-group">
                        <span>Projeto Estrutural:</span>
                        <button class="btn-retro sm active" id="btnCarroAntigo">🚗 Carro Antigo Rígido (Ferro Maciço)</button>
                        <button class="btn-retro sm" id="btnCarroModerno">🛡️ Carro Moderno (Frente Deformável em Sanfona)</button>
                    </div>
                    <button class="btn-retro success" id="btnIniciarCrashTest">💥 DISPARAR CRASH TEST (60 km/h)!</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="deformFeedback">
                <p>Compare a colisão frontal de um carro duro antigo contra um moderno deformável. Veja o impacto sentido pelo passageiro!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Física do Impacto: Tempo e Força</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="deformOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#deformCanvas");
        const ctx = canvas.getContext("2d");
        const btnAntigo = container.querySelector("#btnCarroAntigo");
        const btnModerno = container.querySelector("#btnCarroModerno");
        const btnCrash = container.querySelector("#btnIniciarCrashTest");
        const feedback = container.querySelector("#deformFeedback");

        let isModern = false;
        let carX = 60;
        let carSpeed = 0;
        let isCrashing = false;
        let hasHit = false;
        let crumpleAmount = 0;
        let gForce = 0;
        let targetGForce = 0;

        btnAntigo.onclick = () => {
            isModern = false;
            btnAntigo.classList.add("active");
            btnModerno.classList.remove("active");
            feedback.innerHTML = "<p>Selecionado: <strong>Carro Antigo Rígido</strong> (não amassa, para em apenas 0,03s).</p>";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnModerno.onclick = () => {
            isModern = true;
            btnModerno.classList.add("active");
            btnAntigo.classList.remove("active");
            feedback.innerHTML = "<p>Selecionado: <strong>Carro Moderno com Zona de Deformação</strong> (amassa como sanfona em 0,15s).</p>";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnCrash.onclick = () => {
            carX = 60;
            carSpeed = 8;
            isCrashing = true;
            hasHit = false;
            crumpleAmount = 0;
            gForce = 0;
            targetGForce = isModern ? 12 : 60;
            feedback.innerHTML = "<p>O carro acelera a 60 km/h contra o bloco maciço de concreto!</p>";
            if (window.soundEngine) window.soundEngine.playCrash();
        };

        const draw = () => {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#334155";
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.fillRect(x, 195, 20, 55);
            }

            const wallX = 680;
            ctx.fillStyle = "#64748b";
            ctx.fillRect(wallX, 50, 80, 180);
            for (let y = 60; y < 220; y += 30) {
                ctx.fillStyle = "#facc15";
                ctx.fillRect(wallX, y, 16, 15);
                ctx.fillStyle = "#000000";
                ctx.fillRect(wallX, y + 15, 16, 15);
            }

            ctx.fillStyle = "#0f172a";
            ctx.fillRect(20, 15, 340, 50);
            ctx.strokeStyle = "#475569";
            ctx.strokeRect(20, 15, 340, 50);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("DECELERAÇÃO DO PASSAGEIRO (G-FORCE):", 30, 32);

            const barWidth = 220;
            ctx.fillStyle = "#334155";
            ctx.fillRect(30, 42, barWidth, 14);
            const fillG = (gForce / 70) * barWidth;
            ctx.fillStyle = gForce > 30 ? "#ef4444" : (gForce > 15 ? "#f59e0b" : "#10b981");
            ctx.fillRect(30, 42, Math.min(fillG, barWidth), 14);

            ctx.fillStyle = gForce > 30 ? "#f87171" : "#4ade80";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(`${Math.round(gForce)} G`, 260, 54);

            if (isCrashing) {
                if (!hasHit) {
                    carX += carSpeed;
                    const frontX = carX + 70;
                    if (frontX >= wallX) {
                        hasHit = true;
                        carSpeed = 0;
                        gForce = targetGForce;
                        if (window.soundEngine) window.soundEngine.playCrash();

                        if (!isModern) {
                            crumpleAmount = 6;
                            feedback.innerHTML = `
                                <p class="text-danger">
                                    <strong>🚨 IMPACTO BRUTAL (60G - PANCADA FATAL)!</strong><br>
                                    O carro de ferro maciço mal amassou, mas parou seco em apenas 0,03 segundo! Toda a força colossal foi jogada nos ossos e órgãos do boneco de testes!
                                </p>
                            `;
                            if (window.soundEngine) window.soundEngine.playError();
                        } else {
                            crumpleAmount = 35;
                            feedback.innerHTML = `
                                <p class="text-success">
                                    <strong>🛡️ SOBREVIVEU COM SUCESSO (12G - IMPACTO 5x MENOR)!</strong><br>
                                    A frente do carro amassou de propósito em sanfona, absorvendo a energia e esticando o tempo para 0,15s. A cabine ficou intacta e o impacto no corpo foi suave!
                                </p>
                            `;
                            if (window.soundEngine) window.soundEngine.playSuccess();
                        }
                    }
                }
            }

            const drawX = hasHit ? (wallX - 70 + crumpleAmount) : carX;
            const carY = 145;

            const frontLen = Math.max(35 - crumpleAmount, 10);
            ctx.fillStyle = isModern ? "#3b82f6" : "#b91c1c";
            ctx.fillRect(drawX + 35 - crumpleAmount, carY, frontLen, 35);

            ctx.fillStyle = isModern ? "#1d4ed8" : "#7f1d1d";
            ctx.fillRect(drawX - 35, carY - 20, 70, 55);

            ctx.fillStyle = "#bae6fd";
            ctx.fillRect(drawX - 25, carY - 15, 50, 22);

            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(drawX - 5, carY - 5, 8, 0, Math.PI * 2);
            ctx.fill();

            if (hasHit && isModern) {
                ctx.strokeStyle = "#facc15";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(wallX - 2, carY + 2);
                ctx.lineTo(wallX - 15, carY + 12);
                ctx.lineTo(wallX - 2, carY + 22);
                ctx.lineTo(wallX - 15, carY + 32);
                ctx.stroke();
            }

            ctx.fillStyle = "#0f172a";
            ctx.beginPath();
            ctx.arc(drawX - 15, carY + 38, 12, 0, Math.PI * 2);
            ctx.arc(drawX + 40 - Math.min(crumpleAmount, 15), carY + 38, 12, 0, Math.PI * 2);
            ctx.fill();

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#deformOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 CORRETO!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Revise a conta:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 3: O SEGREDO DA GARRAFA TÉRMICA (VÁCUO & ESPELHO)
    // -------------------------------------------------------------
    renderGarrafaTermicaSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="termoCanvas" width="840" height="260"></canvas>
                <div class="sim-controls">
                    <span>Clique em uma camada para inspecionar a física:</span>
                    <button class="btn-retro sm active" id="btnCamadaVacuo">1. 🌌 Vácuo entre as Paredes</button>
                    <button class="btn-retro sm" id="btnCamadaEspelho">2. 🪞 Paredes Espelhadas</button>
                    <button class="btn-retro sm" id="btnCamadaTampa">3. 🛑 Tampa Isolante Vedada</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="termoFeedback">
                <p>Veja como os 3 mecanismos barram <strong>Condução</strong>, <strong>Convecção</strong> e <strong>Radiação</strong> ao mesmo tempo!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Térmico: O Vácuo e o Calor</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="termoOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#termoCanvas");
        const ctx = canvas.getContext("2d");
        const btnVacuo = container.querySelector("#btnCamadaVacuo");
        const btnEspelho = container.querySelector("#btnCamadaEspelho");
        const btnTampa = container.querySelector("#btnCamadaTampa");
        const feedback = container.querySelector("#termoFeedback");

        let activeLayer = "vacuo";
        let tick = 0;

        btnVacuo.onclick = () => {
            activeLayer = "vacuo";
            btnVacuo.classList.add("active");
            btnEspelho.classList.remove("active");
            btnTampa.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-success">
                    <strong>🌌 Camada de VÁCUO:</strong> Não tem ar nem moléculas no espaço entre os dois vidros. Sem matéria para vibrar ou circular, a <strong>Condução</strong> e a <strong>Convecção</strong> são 100% BLOQUEADAS!
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnEspelho.onclick = () => {
            activeLayer = "espelho";
            btnEspelho.classList.add("active");
            btnVacuo.classList.remove("active");
            btnTampa.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-success">
                    <strong>🪞 Camada ESPELHADA:</strong> O vidro recebe um banho prateado. As ondas invisíveis de <strong>Radiação Térmica</strong> emitidas pelo café batem no espelho e são refletidas de volta para dentro!
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnTampa.onclick = () => {
            activeLayer = "tampa";
            btnTampa.classList.add("active");
            btnVacuo.classList.remove("active");
            btnEspelho.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-success">
                    <strong>🛑 TAMPA ISOLANTE ROSQUEADA:</strong> O ar quente sobe por ser mais leve. A tampa veda a boca da garrafa, impedindo que o ar quente escape para fora por <strong>Convecção</strong>!
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const draw = () => {
            tick++;
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = 340;
            const cy = 135;

            ctx.fillStyle = "#334155";
            ctx.fillRect(cx - 100, cy - 90, 200, 185);

            ctx.fillStyle = "#64748b";
            ctx.fillRect(cx - 85, cy - 75, 170, 160);

            ctx.fillStyle = activeLayer === "vacuo" ? "rgba(56, 189, 248, 0.4)" : "#020617";
            ctx.fillRect(cx - 75, cy - 65, 150, 150);

            if (activeLayer === "vacuo") {
                ctx.strokeStyle = "#38bdf8";
                ctx.lineWidth = 2;
                ctx.strokeRect(cx - 75, cy - 65, 150, 150);
            }

            ctx.fillStyle = activeLayer === "espelho" ? "#fef08a" : "#cbd5e1";
            ctx.fillRect(cx - 60, cy - 55, 120, 135);

            ctx.fillStyle = "#78350f";
            ctx.fillRect(cx - 50, cy - 45, 100, 120);

            ctx.fillStyle = "rgba(254, 215, 170, 0.35)";
            for (let i = 0; i < 4; i++) {
                const py = cy - 45 - ((tick * 1.5 + i * 25) % 40);
                const px = cx - 30 + i * 20 + Math.sin(tick * 0.1 + i) * 8;
                ctx.beginPath();
                ctx.arc(px, py, 6, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = activeLayer === "tampa" ? "#ef4444" : "#1e293b";
            ctx.fillRect(cx - 45, cy - 110, 90, 25);
            ctx.strokeStyle = activeLayer === "tampa" ? "#f87171" : "#475569";
            ctx.strokeRect(cx - 45, cy - 110, 90, 25);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText("ESQUEMA DO CORTE DA GARRAFA TÉRMICA:", 500, 45);

            ctx.fillStyle = activeLayer === "tampa" ? "#ef4444" : "#94a3b8";
            ctx.font = activeLayer === "tampa" ? "bold 13px sans-serif" : "12px sans-serif";
            ctx.fillText("➔ Tampa Vedada: Barra Convecção do topo", 500, 80);

            ctx.fillStyle = activeLayer === "vacuo" ? "#38bdf8" : "#94a3b8";
            ctx.font = activeLayer === "vacuo" ? "bold 13px sans-serif" : "12px sans-serif";
            ctx.fillText("➔ Vácuo: Zero matéria! Barra Condução e Convecção", 500, 120);

            ctx.fillStyle = activeLayer === "espelho" ? "#facc15" : "#94a3b8";
            ctx.font = activeLayer === "espelho" ? "bold 13px sans-serif" : "12px sans-serif";
            ctx.fillText("➔ Paredes Espelhadas: Rebate a Radiação infravermelha", 500, 160);

            ctx.fillStyle = "#fdba74";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText("☕ Líquido Interno a 90°C conservado por 12 horas!", 500, 205);

            if (activeLayer === "espelho") {
                ctx.strokeStyle = "#facc15";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx, cy + 10);
                ctx.lineTo(cx - 58, cy + 10);
                ctx.lineTo(cx - 10, cy + 35);
                ctx.stroke();
            }

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#termoOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 PERFEITO!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 2º ANO - FASE 9: VENTILAÇÃO NATURAL & EFEITO CHAMINÉ (LANTERNIM)
    // -------------------------------------------------------------
    renderVentilacaoChamineSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="chamineCanvas" width="840" height="260"></canvas>
                <div class="sim-controls">
                    <label class="control-toggle">
                        <input type="checkbox" id="chkLanternim" checked>
                        <span class="toggle-slider"></span>
                        <strong id="txtLanternim">Lanternim no Topo do Telhado: ABERTO</strong>
                    </label>
                    <label class="control-toggle">
                        <input type="checkbox" id="chkJanelas" checked>
                        <span class="toggle-slider"></span>
                        <strong id="txtJanelas">Janelas Inferiores: ABERTAS</strong>
                    </label>
                </div>
            </div>
            <div class="sim-feedback-card" id="chamineFeedback">
                <p>Abra e feche o lanternim (saída no topo) e as janelas para ver a mágica da convecção térmica natural!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Física das Habitações: Efeito Chaminé</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="chamineOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#chamineCanvas");
        const ctx = canvas.getContext("2d");
        const chkLanternim = container.querySelector("#chkLanternim");
        const chkJanelas = container.querySelector("#chkJanelas");
        const txtLanternim = container.querySelector("#txtLanternim");
        const txtJanelas = container.querySelector("#txtJanelas");
        const feedback = container.querySelector("#chamineFeedback");

        let lanternimOpen = true;
        let janelasOpen = true;
        let tick = 0;

        chkLanternim.onchange = () => {
            lanternimOpen = chkLanternim.checked;
            txtLanternim.innerText = lanternimOpen ? "Lanternim no Topo do Telhado: ABERTO" : "Lanternim no Topo do Telhado: FECHADO";
            updateFeedback();
            if (window.soundEngine) window.soundEngine.playDial();
        };

        chkJanelas.onchange = () => {
            janelasOpen = chkJanelas.checked;
            txtJanelas.innerText = janelasOpen ? "Janelas Inferiores: ABERTAS" : "Janelas Inferiores: FECHADAS";
            updateFeedback();
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const updateFeedback = () => {
            if (lanternimOpen && janelasOpen) {
                feedback.innerHTML = `
                    <p class="text-success">
                        <strong>🍃 EFEITO CHAMINÉ EM AÇÃO (24°C - FRESQUINHO):</strong> O ar quente sobe naturalmente por convecção e sai pelo lanternim no topo, puxando vento fresco de fora pelas janelas de baixo sem gastar nada de energia!
                    </p>
                `;
            } else if (!lanternimOpen) {
                feedback.innerHTML = `
                    <p class="text-danger">
                        <strong>🔥 CALOR PRESO NO TETO (38°C - ABAFADO):</strong> Sem a saída superior, o ar quente sobe, fica aprisionado sob o telhado e irradia calor de volta para o ambiente, criando uma estufa!
                    </p>
                `;
            } else {
                feedback.innerHTML = `
                    <p class="text-warning">
                        <strong>⚠️ FLUXO PARCIAL (30°C):</strong> O lanternim está aberto, mas com as janelas de baixo fechadas falta entrada de ar fresco para repor a circulação.
                    </p>
                `;
            }
        };
        updateFeedback();

        const draw = () => {
            tick++;
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const bx = 160;
            const by = 80;
            const bw = 360;
            const bh = 140;

            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 220, canvas.width, 40);

            ctx.fillStyle = "#f8fafc";
            ctx.fillRect(bx, by + 40, bw, bh - 40);

            ctx.fillStyle = janelasOpen ? "#38bdf8" : "#64748b";
            ctx.fillRect(bx - 6, by + 80, 12, 35);
            ctx.fillRect(bx + bw - 6, by + 80, 12, 35);

            ctx.fillStyle = "#b45309";
            ctx.beginPath();
            ctx.moveTo(bx - 20, by + 40);
            ctx.lineTo(bx + bw / 2, by - 20);
            ctx.lineTo(bx + bw + 20, by + 40);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = lanternimOpen ? "#e0f2fe" : "#fee2e2";
            ctx.beginPath();
            ctx.moveTo(bx, by + 40);
            ctx.lineTo(bx + bw / 2, by - 10);
            ctx.lineTo(bx + bw, by + 40);
            ctx.closePath();
            ctx.fill();

            const lx = bx + bw / 2 - 25;
            const ly = by - 32;
            ctx.fillStyle = lanternimOpen ? "#38bdf8" : "#78350f";
            ctx.fillRect(lx, ly, 50, 15);
            ctx.strokeStyle = "#451a03";
            ctx.strokeRect(lx, ly, 50, 15);

            if (lanternimOpen && janelasOpen) {
                ctx.fillStyle = "#0284c7";
                for (let i = 0; i < 3; i++) {
                    const px = bx + ((tick * 2 + i * 40) % 120);
                    const py = by + 95;
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = "#ef4444";
                for (let i = 0; i < 5; i++) {
                    const py = (by + 110) - ((tick * 1.8 + i * 30) % 140);
                    const px = bx + bw / 2 + Math.sin(tick * 0.1 + i) * 35;
                    ctx.beginPath();
                    ctx.arc(px, py, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (!lanternimOpen) {
                ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
                ctx.beginPath();
                ctx.moveTo(bx + 20, by + 35);
                ctx.lineTo(bx + bw / 2, by - 5);
                ctx.lineTo(bx + bw - 20, by + 35);
                ctx.closePath();
                ctx.fill();
            }

            const tempVal = (lanternimOpen && janelasOpen) ? 24 : (!lanternimOpen ? 38 : 30);
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(580, 50, 220, 150);
            ctx.strokeStyle = "#475569";
            ctx.strokeRect(580, 50, 220, 150);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText("TERMÔMETRO INTERNO:", 600, 75);

            ctx.fillStyle = tempVal > 32 ? "#ef4444" : (tempVal > 26 ? "#f59e0b" : "#10b981");
            ctx.font = "bold 32px sans-serif";
            ctx.fillText(`${tempVal}°C`, 600, 115);

            ctx.font = "bold 13px sans-serif";
            ctx.fillText(tempVal === 24 ? "🟢 Conforto Ideal!" : (tempVal === 38 ? "🔴 Estufa Quente!" : "🟡 Moderado"), 600, 145);

            ctx.fillStyle = "#94a3b8";
            ctx.font = "12px sans-serif";
            ctx.fillText("Gasto de Energia: R$ 0,00", 600, 175);

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#chamineOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 EXCELENTE!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 3º ANO - FASE 5: O EXPERIMENTO DO VÁCUO (SOM VS LUZ E WI-FI)
    // -------------------------------------------------------------
    renderVacuoSomLuzSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="vacuoCanvas" width="840" height="260"></canvas>
                <div class="sim-controls">
                    <button class="btn-retro success" id="btnToggleBomba">
                        🔌 LIGAR BOMBA DE VÁCUO (Retirar o Ar)
                    </button>
                </div>
            </div>
            <div class="sim-feedback-card" id="vacuoFeedback">
                <p>Ligue a bomba de vácuo para retirar todo o ar e descubra o que acontece com o <strong>Som</strong>, com a <strong>Luz</strong> e com o <strong>Wi-Fi</strong>!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Desafio Ondulatório: Ondas Mecânicas vs Eletromagnéticas</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="vacuoOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#vacuoCanvas");
        const ctx = canvas.getContext("2d");
        const btnBomba = container.querySelector("#btnToggleBomba");
        const feedback = container.querySelector("#vacuoFeedback");

        let isPumpOn = false;
        let pressure = 1.0;
        let soundDb = 85;
        let tick = 0;

        btnBomba.onclick = () => {
            isPumpOn = !isPumpOn;
            btnBomba.innerText = isPumpOn ? "🌬️ ABRIR VÁLVULA DE AR (Encher de Ar)" : "🔌 LIGAR BOMBA DE VÁCUO (Retirar o Ar)";
            btnBomba.className = isPumpOn ? "btn-retro warning" : "btn-retro success";
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const draw = () => {
            tick++;

            if (isPumpOn && pressure > 0) {
                pressure = Math.max(0, pressure - 0.02);
                soundDb = Math.max(0, Math.round(pressure * 85));
            } else if (!isPumpOn && pressure < 1.0) {
                pressure = Math.min(1.0, pressure + 0.03);
                soundDb = Math.round(pressure * 85);
            }

            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#334155";
            ctx.fillRect(60, 200, 440, 50);

            const bellX = 260;
            const bellY = 135;
            ctx.fillStyle = `rgba(56, 189, 248, ${0.15 + pressure * 0.1})`;
            ctx.beginPath();
            ctx.arc(bellX, bellY, 75, Math.PI, 0, false);
            ctx.lineTo(bellX + 75, bellY + 65);
            ctx.lineTo(bellX - 75, bellY + 65);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = "#ef4444";
            ctx.fillRect(bellX - 45, bellY + 30, 26, 26);
            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(bellX - 45, bellY + 28, 6, 0, Math.PI * 2);
            ctx.arc(bellX - 20, bellY + 28, 6, 0, Math.PI * 2);
            ctx.fill();

            if (soundDb > 5) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${pressure * 0.8})`;
                ctx.lineWidth = 2;
                for (let r = 10; r < 50; r += 14) {
                    const waveR = (r + (tick * 1.5) % 30);
                    ctx.beginPath();
                    ctx.arc(bellX - 32, bellY + 35, waveR, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(bellX + 25, bellY + 25, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(254, 240, 138, 0.7)";
            ctx.lineWidth = 2;
            for (let a = 0; a < Math.PI * 2; a += 0.5) {
                ctx.beginPath();
                ctx.moveTo(bellX + 25, bellY + 25);
                ctx.lineTo(bellX + 25 + Math.cos(a) * 45, bellY + 25 + Math.sin(a) * 45);
                ctx.stroke();
            }

            ctx.fillStyle = "#a855f7";
            ctx.fillRect(bellX - 5, bellY - 20, 10, 20);
            ctx.strokeStyle = "#c084fc";
            ctx.lineWidth = 2;
            for (let r = 10; r < 40; r += 12) {
                const wr = (r + (tick * 1.2) % 25);
                ctx.beginPath();
                ctx.arc(bellX, bellY - 20, wr, -Math.PI * 0.75, -Math.PI * 0.25);
                ctx.stroke();
            }

            ctx.strokeStyle = "#020617";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(bellX, bellY + 65);
            ctx.lineTo(bellX, 225);
            ctx.lineTo(60, 225);
            ctx.stroke();

            ctx.fillStyle = "#1e293b";
            ctx.fillRect(530, 30, 280, 200);
            ctx.strokeStyle = "#475569";
            ctx.strokeRect(530, 30, 280, 200);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText("LEITURA DOS INSTRUMENTOS:", 550, 55);

            ctx.fillStyle = pressure < 0.1 ? "#ef4444" : "#38bdf8";
            ctx.font = "bold 15px sans-serif";
            ctx.fillText(`Pressão do Ar: ${pressure.toFixed(2)} atm ${pressure < 0.05 ? '(VÁCUO!)' : ''}`, 550, 90);

            ctx.fillStyle = soundDb === 0 ? "#ef4444" : "#10b981";
            ctx.fillText(`Som do Alarme: ${soundDb} dB ${soundDb === 0 ? '🔇 (SILÊNCIO!)' : '🔊'}`, 550, 130);

            ctx.fillStyle = "#facc15";
            ctx.fillText(`Luz da Lâmpada: 100% (Brilhando!)`, 550, 170);
            ctx.fillStyle = "#c084fc";
            ctx.fillText(`Sinal do Wi-Fi: 100% (Sem perdas!)`, 550, 205);

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#vacuoOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 SENSACIONAL!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }

    // -------------------------------------------------------------
    // 3º ANO - FASE 10: O LABORATÓRIO DO ROTEADOR IDEAL
    // (Onde instalar o Wi-Fi na residência?)
    // -------------------------------------------------------------
    renderPosicionamentoWifiSim(container, missao, onComplete) {
        container.innerHTML = `
            <div class="sim-canvas-container">
                <canvas id="posWifiCanvas" width="840" height="260"></canvas>
                <div class="sim-controls">
                    <span>Onde instalar o roteador Wi-Fi na planta da casa?</span>
                    <button class="btn-retro sm" id="btnPosArmario">1. 📦 No chão, no armário de metal</button>
                    <button class="btn-retro sm" id="btnPosQuarto">2. 🛋️ No cantinho do quarto dos fundos</button>
                    <button class="btn-retro sm active" id="btnPosCorredor">3. ⭐ No corredor central, no alto (1,80 m)</button>
                </div>
            </div>
            <div class="sim-feedback-card" id="posWifiFeedback">
                <p>Selecione cada local para testar a cobertura das ondas e evitar pontos cegos!</p>
            </div>
            <div class="calc-box">
                <div class="calc-badge">Telecomunicações: Cobertura Doméstica Ideal</div>
                <p class="calc-question">${missao.calcData.pergunta}</p>
                <div class="calc-options" id="posWifiOptions"></div>
            </div>
        `;

        const canvas = container.querySelector("#posWifiCanvas");
        const ctx = canvas.getContext("2d");
        const btnArmario = container.querySelector("#btnPosArmario");
        const btnQuarto = container.querySelector("#btnPosQuarto");
        const btnCorredor = container.querySelector("#btnPosCorredor");
        const feedback = container.querySelector("#posWifiFeedback");

        let currentPos = "corredor";
        let tick = 0;

        btnArmario.onclick = () => {
            currentPos = "armario";
            btnArmario.classList.add("active");
            btnQuarto.classList.remove("active");
            btnCorredor.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-danger">
                    <strong>❌ PÉSSIMA ESCOLHA (18% de Cobertura):</strong> O armário de metal reflete as ondas e o chão engole a radiação. A cozinha, os quartos e o banheiro ficaram totalmente sem internet!
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnQuarto.onclick = () => {
            currentPos = "quarto";
            btnQuarto.classList.add("active");
            btnArmario.classList.remove("active");
            btnCorredor.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-warning">
                    <strong>⚠️ REGULAR (42% de Cobertura):</strong> O quarto tem sinal cheio, mas metade do sinal é desperdiçado no quintal do vizinho e as ondas sofrem para atravessar 4 paredes até a sala.
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        btnCorredor.onclick = () => {
            currentPos = "corredor";
            btnCorredor.classList.add("active");
            btnArmario.classList.remove("active");
            btnQuarto.classList.remove("active");
            feedback.innerHTML = `
                <p class="text-success">
                    <strong>⭐ POSIÇÃO IDEAL (98% de Cobertura Máxima):</strong> No corredor central e no alto (1,80 m), as ondas viajam por cima dos sofás e móveis com visão direta para as portas de todos os cômodos!
                </p>
            `;
            if (window.soundEngine) window.soundEngine.playDial();
        };

        const draw = () => {
            tick++;
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const ox = 40;
            const oy = 25;
            const pw = 480;
            const ph = 210;

            ctx.fillStyle = "#1e293b";
            ctx.fillRect(ox, oy, pw, ph);

            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 4;
            ctx.strokeRect(ox, oy, pw, ph);

            ctx.beginPath();
            ctx.moveTo(ox + 160, oy);
            ctx.lineTo(ox + 160, oy + 140);
            ctx.moveTo(ox + 320, oy);
            ctx.lineTo(ox + 320, oy + 110);
            ctx.moveTo(ox + 160, oy + 110);
            ctx.lineTo(ox + 480, oy + 110);
            ctx.stroke();

            ctx.fillStyle = "#94a3b8";
            ctx.font = "bold 11px sans-serif";
            ctx.fillText("SALA DE ESTAR", ox + 35, oy + 60);
            ctx.fillText("CORREDOR", ox + 180, oy + 50);
            ctx.fillText("QUARTO 1", ox + 360, oy + 55);
            ctx.fillText("COZINHA", ox + 50, oy + 170);
            ctx.fillText("BANHEIRO", ox + 180, oy + 170);
            ctx.fillText("QUARTO 2", ox + 360, oy + 170);

            let rx = ox + 240;
            let ry = oy + 70;
            let radiusMax = 220;
            let signalColor = "#10b981";
            let coveragePct = 98;

            if (currentPos === "armario") {
                rx = ox + 30;
                ry = oy + 30;
                radiusMax = 70;
                signalColor = "#ef4444";
                coveragePct = 18;
            } else if (currentPos === "quarto") {
                rx = ox + 450;
                ry = oy + 180;
                radiusMax = 140;
                signalColor = "#f59e0b";
                coveragePct = 42;
            }

            for (let r = 15; r < radiusMax; r += 22) {
                const wr = (r + (tick * 1.2) % 22);
                ctx.strokeStyle = signalColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(rx, ry, wr, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.fillStyle = "#0284c7";
            ctx.fillRect(rx - 10, ry - 6, 20, 12);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rx - 6, ry - 6);
            ctx.lineTo(rx - 10, ry - 16);
            ctx.moveTo(rx + 6, ry - 6);
            ctx.lineTo(rx + 10, ry - 16);
            ctx.stroke();

            ctx.fillStyle = "#1e293b";
            ctx.fillRect(550, 25, 260, 210);
            ctx.strokeStyle = "#475569";
            ctx.strokeRect(550, 25, 260, 210);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText("DIAGNÓSTICO DE SINAL:", 570, 52);

            ctx.fillStyle = signalColor;
            ctx.font = "bold 32px sans-serif";
            ctx.fillText(`${coveragePct}%`, 570, 95);

            ctx.font = "bold 13px sans-serif";
            ctx.fillText(coveragePct > 80 ? "🟢 Cobertura Excelente!" : (coveragePct < 30 ? "🔴 Sinal Inexistente!" : "🟡 Sinal Parcial"), 570, 125);

            ctx.fillStyle = "#94a3b8";
            ctx.font = "12px sans-serif";
            ctx.fillText(`• Sala: ${coveragePct > 50 ? '4 barras (Forte)' : '1 barra (Fraco)'}`, 570, 155);
            ctx.fillText(`• Quarto 1: ${coveragePct > 80 ? '4 barras' : (coveragePct > 40 ? '2 barras' : 'Sem sinal')}`, 570, 175);
            ctx.fillText(`• Cozinha: ${coveragePct > 80 ? '4 barras' : '1 barra'}`, 570, 195);

            this.animFrameId = requestAnimationFrame(draw);
        };
        draw();

        const optsContainer = container.querySelector("#posWifiOptions");
        const shuffled = shuffleArray(missao.calcData.opcoes);
        shuffled.forEach(op => {
            const btn = document.createElement("button");
            btn.className = "btn-option";
            btn.innerText = `${op.valor}`;
            btn.onclick = () => {
                if (op.correta) {
                    btn.classList.add("correct");
                    feedback.innerHTML = `<p class="text-success"><strong>🎉 EXCELENTE!</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playSuccess();
                    setTimeout(() => onComplete(), 1500);
                } else {
                    btn.classList.add("wrong");
                    feedback.innerHTML = `<p class="text-danger"><strong>❌ Tente novamente:</strong> ${op.explicacao}</p>`;
                    if (window.soundEngine) window.soundEngine.playError();
                }
            };
            optsContainer.appendChild(btn);
        });
    }
}

window.simulationManager = new SimulationManager();
