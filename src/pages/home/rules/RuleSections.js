// src/pages/rules/ruleSections.js
export const ruleSections = [
  {
    id: 'historia',
    title: 'História',
    content: `
      <p>
        Há mais de 15 anos nosso grupo se reúne para jogar 
        <strong>Magic: The Gathering</strong>. Ao longo do tempo jogamos vários formatos,
        passando por fases de custo elevado, formatos instáveis e mudanças constantes
        nas regras oficiais do jogo.
      </p>

      <p>
        Buscando estabilidade, adotamos inicialmente o <strong>Commander</strong> e, depois,
        <strong>Tiny Leaders</strong> e <strong>Conquest</strong>. Também migramos para o
        <em>mesão</em> (multiplayer) e para mesas no estilo “farofão”, com partidas mais rápidas
        e dinâmicas.
      </p>

      <p>
        A partir das necessidades do grupo — otimizar tempo, reduzir custos e manter o jogo
        divertido — criamos mecanismos como a inscrição por rodada, pote da confra, pote dos
        derrotados e critérios de desempate. Essas estruturas evoluíram ao longo dos anos
        até chegarem na configuração atual do evento.
      </p>

      <p>
        O projeto <strong>Gathering</strong> nasceu exatamente para organizar tudo isso
        de forma prática, moderna e automatizada.
      </p>
    `
  },

  {
    id: 'como-funciona',
    title: 'Como Funciona',
    content: `
      <p>O <strong>Gathering</strong> foi criado para gerenciar eventos multiplayer com:</p>

      <ul>
        <li>Inscrições por evento (taxa da confra)</li>
        <li>Inscrições por rodada (taxa da rodada)</li>
        <li>Premiações</li>
        <li>Pote dos derrotados</li>
        <li>Pote da confra</li>
        <li>Rank final do evento</li>
      </ul>

      <p>
        Ele controla todos os participantes, rodadas, resultados, premiações e
        transações financeiras, além de automatizar o cálculo de rank e gerar
        extratos individuais.
      </p>
    `
  },

  {
    id: 'formatos',
    title: 'Formatos',
    content: `
      <p>
        Os formatos representam o estilo de jogo. No Magic usamos:
      </p>

      <table>
        <tr><th>Formato</th><th>Pontos de Vida</th></tr>
        <tr><td>Commander</td><td>40</td></tr>
        <tr><td>Conquest</td><td>30</td></tr>
        <tr><td>Tiny Leaders</td><td>30</td></tr>
      </table>

      <p>
        Porém, o sistema aceita qualquer jogo multiplayer com um vencedor:
        <em>Ludo</em>, <em>Detetive</em>, <em>Stop</em>, entre outros.
      </p>
    `
  },

  {
    id: 'jogadores',
    title: 'Jogadores',
    content: `
      <p>
        Para registrar um jogador basta informar o nome. A recomendação é incluir
        sobrenome para evitar duplicidade ou confusão.
      </p>
    `
  },

  {
    id: 'confras',
    title: 'Confras',
    content: `
      <p>
        A confra define o contexto global do app. Cada evento, rodada, rank, extrato
        e transação pertence a uma confra específica.
      </p>

      <p>
        Ao acessar a Home Page, você seleciona qual confra deseja visualizar e
        utilizar.
      </p>
    `
  },

  {
    id: 'eventos',
    title: 'Eventos',
    content: `
      <p>Um evento possui:</p>

      <ul>
        <li>Formato (opcional)</li>
        <li>Taxa da confra (inscrição do evento)</li>
        <li>Taxa da rodada (inscrição por partida)</li>
      </ul>

      <p>
        Também é possível definir configurações personalizadas de premiação e
        pote dos derrotados dependendo da quantidade de jogadores da rodada.
      </p>
    `
  },

  {
    id: 'rodadas',
    title: 'Rodadas',
    content: `
      <p>
        Cada rodada representa uma partida jogada. Devem ser registrados:
      </p>

      <ul>
        <li>Formato (se não estiver definido no evento)</li>
        <li>Jogadores participantes</li>
        <li>Vencedor</li>
        <li>Status (ativa ou cancelada)</li>
      </ul>

      <p>Rodadas canceladas <strong>não entram no rank</strong>.</p>
    `
  },

  {
    id: 'rank',
    title: 'Rank',
    content: `
      <p>
        O rank é calculado com base no 
        <strong>Saldo Rankeado</strong>:
      </p>

      <!-- Formula (tabela visual) -->
      <div class="row justify-center text-center text-bold q-pa-md">
        <table class="justify-center" role="table" aria-label="Saldo Rankeado formula">
            <tbody>
            <tr>
                <td class="col-saldo">Saldo</td>
                <td class="col-eq q-px-md">=</td>
                <td class="col-main">Total de</td>
                <td class="col-op q-px-md">-</td>
                <td class="col-main">Total de</td>
            </tr>
            <tr>
                <td class="col-saldo">Rankeado</td>
                <td class="col-eq"></td>
                <td class="col-desc">Premiações</td>
                <td class="col-op"></td>
                <td class="col-desc">Inscrições</td>
            </tr>
            </tbody>
        </table>
      </div>

      <p>
        Critérios de desempate:
      </p>

      <ol>
        <li>Quem jogou mais rodadas</li>
        <li>Se continuar empatado → divide o mesmo rank</li>
      </ol>

      <p>
        Após o cálculo do evento, cada jogador recebe automaticamente:
      </p>

      <ul>
        <li>Transação de Inscrição</li>
        <li>Transação de Resultado</li>
      </ul>

      <p>
        O saldo final de um jogador pode incluir valores provenientes
        do pote dos derrotados.
      </p>
    `
  },

  {
    id: 'sugestoes',
    title: 'Sugestões',
    content: `
      <ul>
        <li>Mínimo de 10 participações para acesso à confra</li>
        <li>Inscrição grátis após 10 participações</li>
        <li>No dia da confra:
          <ul>
            <li>Inscrição do evento grátis</li>
            <li>Rodadas grátis</li>
            <li>Premiação paga com o pote da confra</li>
            <li>Possível sorteio de brindes</li>
          </ul>
        </li>
      </ul>
    `
  }
]
