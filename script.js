// --- 設定 & データ定義 ---
const SAVE_KEY = 'english_quest_jhs2_v6_random_fix_final'; // キーを変更

// --- 称号データ ---
const ACHIEVEMENTS = [
    {id:'c1', name:'未来への一歩', desc:'Stage 1 クリア', icon:'🌱'},
    {id:'c2', name:'ルールの番人', desc:'Stage 2 クリア', icon:'👮'},
    {id:'c3', name:'不定詞使い', desc:'Stage 3 クリア', icon:'🔗'},
    {id:'c4', name:'動的アクション', desc:'Stage 4 クリア', icon:'🏃'},
    {id:'c5', name:'論理的思考', desc:'Stage 5 クリア', icon:'🧠'},
    {id:'c6', name:'構造分析', desc:'Stage 6 クリア', icon:'🏗️'},
    {id:'c7', name:'頂点を目指して', desc:'Stage 7 クリア', icon:'🏔️'},
    {id:'c8', name:'受け身の美学', desc:'Stage 8 クリア', icon:'🛡️'},
    {id:'c9', name:'熟語マスター', desc:'Stage 9 クリア', icon:'📖'},
    {id:'c10', name:'中2英語制覇', desc:'Stage 10 クリア', icon:'📜'},
    {id:'c11', name:'グランドマスター', desc:'Final Quest クリア', icon:'🎓'},
    {id:'c12', name:'神話の領域', desc:'EX Stage クリア', icon:'👑'},
    
    {id:'combo_10', name:'リズム', desc:'10コンボ達成', icon:'🎵'},
    {id:'combo_30', name:'フロー', desc:'30コンボ達成', icon:'🌊'},
    {id:'combo_50', name:'ゾーン', desc:'50コンボ達成', icon:'⚡'},
    {id:'rank_s', name:'完璧主義', desc:'ランクSを獲得', icon:'✨'},
    {id:'rank_f', name:'挫折を知る', desc:'ゲームオーバーになる', icon:'💀'},
    {id:'no_miss', name:'ノーミス', desc:'全問正解でクリア', icon:'🎯'},
    {id:'full_hp', name:'無傷の生還', desc:'HP満タンでクリア', icon:'🛡️'},
    {id:'survivor', name:'生存者', desc:'HP1でクリア', icon:'❤️‍🔥'},
    {id:'boss_killer', name:'ボス撃破', desc:'ボスに勝利する', icon:'👹'},

    {id:'rich', name:'大富豪', desc:'1000G 貯める', icon:'💰'},
    {id:'item_user', name:'道具使い', desc:'アイテムを使用する', icon:'💊'},

    {id:'total_50', name:'学習の芽', desc:'累計50問正解', icon:'🥉'},
    {id:'total_100', name:'知識の蕾', desc:'累計100問正解',icon:'🥈'},
    {id:'total_300', name:'大賢者', desc:'累計300問正解', icon:'🥇'},
    {id:'total_500', name:'伝説', desc:'累計500問正解', icon:'💎'},
    {id:'total_1000', name:'英語の神', desc:'累計1000問正解', icon:'🪐'},
    {id:'level_5', name:'ルーキー', desc:'Lv.5 到達', icon:'⭐'},
    {id:'level_10', name:'ベテラン', desc:'Lv.10 到達', icon:'🌟'},
    {id:'level_20', name:'マスター', desc:'Lv.20 到達', icon:'🌌'},
    {id:'end_10', name:'持久力', desc:'エンドレス10問正解', icon:'🔋'},
    {id:'end_30', name:'無限の彼方', desc:'エンドレス30問正解', icon:'🚀'},

    {id:'night_owl', name:'夜更かし', desc:'深夜(0-4時)にプレイ', icon:'🦉', hidden:true},
    {id:'lucky_7', name:'ラッキー7', desc:'スコアの末尾が77', icon:'🎰', hidden:true},
    {id:'creator', name:'創造主', desc:'デバッグモード起動', icon:'🛠️', hidden:true}
];

const STAGE_TITLES = {
    1:"未来形", 2:"助動詞", 3:"不定詞", 4:"動名詞", 5:"接続詞",
    6:"文型(SVOO/SVOC)", 7:"比較", 8:"受動態", 9:"重要表現", 10:"総復習", 
    11:"Final Review", 12:"EX:鬼の全文記述(超難問)"
};

// --- シャッフル関数 ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- 問題データ生成 ---
function getStageData(stageId) {
    let q = [];
    const add = (type, qText, ans, opts, expl) => {
        // IDに現在時刻と乱数を含めて完全にユニークにする
        q.push({ id: `${stageId}_${q.length}_${Date.now()}_${Math.random()}`, stage: stageId, type, q: qText, a: ans, o: opts, expl });
    };

    // --- Stage 1: 未来形 ---
    if (stageId === 1 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) visit Kyoto next week.', 'will', ['will','am','do','can'], '単純未来のwill');
        add('choice', 'It ( ) be rainy tomorrow.', 'will', ['will','is','does','has'], '天気の未来');
        add('choice', 'I am ( ) to play tennis.', 'going', ['going','go','will','goes'], 'be going to ~');
        add('choice', 'Are you ( ) to study hard?', 'going', ['going','go','will','gonna'], 'Are you going to ~?');
        add('sort', '私は明日、彼に会うつもりです。', 'I am going to see him tomorrow', ['I','am','going','to','see','him','tomorrow'], 'be going to see');
        add('sort', 'あなたはいつ宿題をするつもりですか？', 'When are you going to do your homework', ['When','are','you','going','to','do','your','homework'], 'When are you going to ~?');
        add('sort', '私はあなたのことは忘れません。', 'I will not forget you', ['I','will','not','forget','you'], 'will not (won\'t)');
        add('fill', '私はテニスをするつもりです。 I ( ) going to play tennis.', 'am', null, 'I am going to ~');
        add('fill', '明日晴れるでしょう。 It ( ) be sunny tomorrow.', 'will', null, 'It will be ~');
        add('full', '私は来年14歳になります。', 'I will be fourteen next year.', null, 'I will be ~');
        add('full', '彼は車を買うつもりです。', 'He is going to buy a car.', null, 'be going to buy');
        add('choice', 'She ( ) come to the party.', "won't", ["won't","not","isn't","doesn't"], 'will not の短縮');
        add('sort', 'ドアを開けましょうか？', 'Shall I open the door', ['Shall','I','open','the','door'], 'Shall I ~?');
        add('sort', '一緒に昼食を食べませんか？', 'Shall we have lunch', ['Shall','we','have','lunch'], 'Shall we ~?');
        add('fill', '京都へ行くつもりですか？ ( ) you going to visit Kyoto?', 'Are', null, 'Are you going to ~');
        add('full', '雨が降るでしょう。', 'It will rain.', null, 'It will rain.');
        add('full', '彼らはここに来ないでしょう。', "They won't come here.", null, "won't come");
    }

    // --- Stage 2: 助動詞 ---
    if (stageId === 2 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'You ( ) clean your room.', 'must', ['must','are','do','will'], '義務(must)');
        add('choice', 'I ( ) to study math.', 'have', ['have','must','should','can'], 'have to ~');
        add('choice', 'He ( ) to get up early.', 'has', ['has','have','must','should'], '3単現 has to');
        add('choice', 'You ( ) not eat here.', 'must', ['must','do','have','are'], '禁止 must not');
        add('sort', '私は宿題をしなければなりません。', 'I must do my homework', ['I','must','do','my','homework'], 'must do');
        add('sort', 'あなたは英語を話さなくてもよい。', 'You do not have to speak English', ['You','do','not','have','to','speak','English'], 'don\'t have to (不必要)');
        add('sort', 'もっと早く寝るべきです。', 'You should go to bed earlier', ['You','should','go','to','bed','earlier'], 'should (助言)');
        add('fill', 'ケンは今日、働かなければなりません。 Ken ( ) to work today.', 'has', null, 'Ken has to');
        add('fill', '入ってもよろしいですか？ ( ) I come in?', 'May', null, 'May I ~?');
        add('full', 'あなたは医者に診てもらうべきです。', 'You should see a doctor.', null, 'should see');
        add('full', 'ここで写真を撮ってはいけません。', 'You must not take pictures here.', null, 'must not (禁止)');
        add('choice', 'May I ( ) your computer?', 'use', ['use','to use','using','used'], '助動詞の後は原形');
        add('sort', '私の父は明日、早く起きなければなりません。', 'My father has to get up early tomorrow', ['My','father','has','to','get','up','early','tomorrow'], 'has to get up');
        add('full', '私はその本を読まなければなりませんか？', 'Do I have to read the book?', null, 'Do I have to ~?');
        add('full', '私たちは急ぐ必要はありません。', "We don't have to hurry.", null, "don't have to");
        add('choice', 'It ( ) be true.', 'may', ['may','have','do','are'], '推量(may) かもしれない');
    }

    // --- Stage 3: 不定詞 ---
    if (stageId === 3 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I like ( ) swim.', 'to', ['to','for','at','on'], 'like to (名詞的)');
        add('choice', 'I want something ( ) drink.', 'to', ['to','for','of','in'], 'something to (形容詞的)');
        add('choice', 'I went to the park ( ) play soccer.', 'to', ['to','for','at','on'], '目的 (副詞的)');
        add('sort', '私は歌手になりたい。', 'I want to be a singer', ['I','want','to','be','a','singer'], 'want to be');
        add('sort', '私はすべきことがたくさんあります。', 'I have many things to do', ['I','have','many','things','to','do'], 'things to do');
        add('sort', 'あなたに会えて嬉しいです。', 'I am glad to see you', ['I','am','glad','to','see','you'], 'glad to (感情の原因)');
        add('fill', '私は本を読むのが好きです。 I like ( ) read books.', 'to', null, 'like to');
        add('fill', '彼は英語を勉強するために起きました。 He got up ( ) study English.', 'to', null, 'to study');
        add('full', '私の趣味は切手を集めることです。', 'My hobby is to collect stamps.', null, 'is to collect');
        add('full', '京都を訪れるのによい季節です。', 'It is a good season to visit Kyoto.', null, 'season to visit');
        add('choice', 'To ( ) English is important.', 'study', ['study','studies','studying','studied'], 'To study (主語)');
        add('sort', 'なぜここに来たのですか？', 'Why did you come here', ['Why','did','you','come','here'], '基本の疑問文');
        add('sort', 'マイクと話すために', 'to talk with Mike', ['to','talk','with','Mike'], '副詞的用法');
        add('full', '私は何か食べるものが欲しい。', 'I want something to eat.', null, 'something to eat');
        add('full', '英語を話すことは簡単ではありません。', 'To speak English is not easy.', null, 'To speak English (主語)');
    }

    // --- Stage 4: 動名詞 ---
    if (stageId === 4 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I enjoy ( ) tennis.', 'playing', ['playing','to play','play','played'], 'enjoy + ing');
        add('choice', 'Stop ( ) TV.', 'watching', ['watching','to watch','watch','watched'], 'stop + ing');
        add('choice', 'He finished ( ) lunch.', 'eating', ['eating','to eat','eat','ate'], 'finish + ing');
        add('sort', '音楽を聴くことは楽しい。', 'Listening to music is fun', ['Listening','to','music','is','fun'], 'Listening (主語)');
        add('sort', '泳ぐのは得意ですか？', 'Are you good at swimming', ['Are','you','good','at','swimming'], 'good at + ing');
        add('sort', 'その本を読み終えましたか？', 'Did you finish reading the book', ['Did','you','finish','reading','the','book'], 'finish reading');
        add('fill', 'あなたに会えるのを楽しみにしています。 I am looking forward to ( ) you.', 'seeing', null, 'forward to + ing');
        add('fill', '走るのをやめなさい。 Stop ( ).', 'running', null, 'stop running');
        add('full', '私の趣味は絵を描くことです。', 'My hobby is painting.', null, 'is painting');
        add('full', '英語を話すことは大切です。', 'Speaking English is important.', null, 'Speaking (主語)');
        add('choice', 'How about ( ) to the park?', 'going', ['going','go','to go','went'], 'How about + ing');
        add('choice', 'Thank you for ( ) me.', 'inviting', ['inviting','invite','to invite','invited'], '前置詞 + ing');
        add('sort', '写真を撮るのを楽しみましたか？', 'Did you enjoy taking pictures', ['Did','you','enjoy','taking','pictures'], 'enjoy taking');
        add('full', '彼は夕食を作り始めました。', 'He started cooking dinner.', null, 'start cooking');
        add('full', '待たせてごめんなさい。', 'I am sorry for keeping you waiting.', null, 'sorry for keeping');
    }

    // --- Stage 5: 接続詞 ---
    if (stageId === 5 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I think ( ) he is kind.', 'that', ['that','if','which','who'], 'I think that ~');
        add('choice', '( ) you are busy, I will help you.', 'If', ['If','That','But','And'], 'If (もし〜なら)');
        add('choice', 'I stayed home ( ) I was sick.', 'because', ['because','so','that','if'], 'because (〜なので)');
        add('choice', '( ) I was a child, I lived in Tokyo.', 'When', ['When','If','That','Because'], 'When (〜のとき)');
        add('sort', '私は彼がいい先生だと思います。', 'I think that he is a good teacher', ['I','think','that','he','is','a','good','teacher'], 'think that');
        add('sort', 'もし晴れたら、ピクニックに行きましょう。', 'If it is sunny let us go on a picnic', ['If','it','is','sunny','let','us','go','on','a','picnic'], 'If it is sunny');
        add('sort', '母が帰ってきたとき、私は勉強していました。', 'I was studying when my mother came home', ['I','was','studying','when','my','mother','came','home'], '... when S V');
        add('fill', '彼がいつ来るか知っていますか？ Do you know ( ) he will come?', 'when', null, 'know when ...');
        add('fill', '私は、英語は大切だと思います。 I ( ) that English is important.', 'think', null, 'think that');
        add('full', 'もし明日雨なら、私は家にいます。', "If it rains tomorrow, I will stay home.", null, "If it rains");
        add('full', '疲れていたので早く寝ました。', 'I went to bed early because I was tired.', null, 'because I was tired');
        add('choice', 'I know ( ) she likes cats.', 'that', ['that','if','what','when'], 'know that');
        add('sort', '彼が正しいと信じています。', 'I believe that he is right', ['I','believe','that','he','is','right'], 'believe that');
        add('full', '私が帰宅した時、父は料理をしていました。', 'When I got home, my father was cooking.', null, 'When I got home');
        add('full', 'あなたは彼が医者だと知っていますか？', 'Do you know that he is a doctor?', null, 'Do you know that');
        add('sort', 'もし暇なら、私に電話してください。', 'Please call me if you are free', ['Please','call','me','if','you','are','free'], 'if you are free');
    }

    // --- Stage 6: 文型 ---
    if (stageId === 6 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'My father gave ( ) a watch.', 'me', ['me','I','my','mine'], 'give 人 物');
        add('choice', 'I call ( ) Ken.', 'him', ['him','he','his','himself'], 'call O C');
        add('choice', 'This song makes me ( ).', 'happy', ['happy','happily','happiness','to happy'], 'make O C(形容詞)');
        add('sort', '私にその写真を見せてください。', 'Please show me the picture', ['Please','show','me','the','picture'], 'show 人 物');
        add('sort', '私は彼に英語を教えます。', 'I teach him English', ['I','teach','him','English'], 'teach 人 物');
        add('sort', '私たちはその犬をポチと呼びます。', 'We call the dog Pochi', ['We','call','the','dog','Pochi'], 'call O C');
        add('fill', '彼の名前を教えてください。 Please tell ( ) your name.', 'me', null, 'tell me');
        add('fill', 'そのニュースは彼女を悲しませました。 The news made ( ) sad.', 'her', null, 'made her sad');
        add('full', '父は私に自転車を買ってくれました。', 'My father bought me a bike.', null, 'buy 人 物');
        add('full', '人々は彼女をアンと呼びます。', 'People call her Anne.', null, 'call her Anne');
        add('choice', 'She made ( ) a cake.', 'me', ['me','I','my','mine'], 'make 人 物 (〜を作ってあげる)');
        add('sort', 'あなたはその部屋をきれいにしておくべきです。', 'You should keep the room clean', ['You','should','keep','the','room','clean'], 'keep O C');
        add('sort', '彼らはその猫をタマと名付けました。', 'They named the cat Tama', ['They','named','the','cat','Tama'], 'name O C');
        add('full', '私に塩を取ってくれませんか？', 'Will you pass me the salt?', null, 'pass me the salt');
        add('full', 'この映画はいつも私をワクワクさせます。', 'This movie always makes me excited.', null, 'makes me excited');
    }

    // --- Stage 7: 比較 ---
    if (stageId === 7 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'He is ( ) than I.', 'taller', ['taller','tall','tallest','more tall'], '比較級 (-er)');
        add('choice', 'This is the ( ) mountain in Japan.', 'highest', ['highest','high','higher','most high'], '最上級 (the -est)');
        add('choice', 'English is ( ) interesting than math.', 'more', ['more','most','much','very'], 'more + 長い単語');
        add('choice', 'He runs as ( ) as Ken.', 'fast', ['fast','faster','fastest','more fast'], 'as 原級 as');
        add('sort', '私はあなたより年上です。', 'I am older than you', ['I','am','older','than','you'], 'older than');
        add('sort', 'これは世界で最も古い本です。', 'This is the oldest book in the world', ['This','is','the','oldest','book','in','the','world'], 'the oldest');
        add('sort', 'サッカーは日本で最も人気のあるスポーツの一つです。', 'Soccer is one of the most popular sports in Japan', ['Soccer','is','one','of','the','most','popular','sports','in','Japan'], 'one of the most ~');
        add('fill', '母は私より早起きです。 My mother gets up ( ) than I.', 'earlier', null, 'earlier');
        add('fill', 'トムはクラスで一番背が高い。 Tom is the ( ) student in his class.', 'tallest', null, 'the tallest');
        add('full', '私は夏より冬のほうが好きです。', 'I like winter better than summer.', null, 'like A better than B');
        add('full', 'この映画はあの映画と同じくらい面白い。', 'This movie is as interesting as that one.', null, 'as interesting as');
        add('choice', 'Which is ( ), tea or coffee?', 'better', ['better','best','good','well'], 'goodの比較級');
        add('sort', '彼は私より上手に泳げます。', 'He can swim better than I', ['He','can','swim','better','than','I'], 'better (wellの比較級)');
        add('full', 'ロシアは世界で一番大きな国です。', 'Russia is the largest country in the world.', null, 'the largest');
        add('full', 'あなたのカバンは私のものより重いですか？', 'Is your bag heavier than mine?', null, 'heavier');
        add('choice', 'He is the best ( ) all.', 'of', ['of','in','at','for'], 'of all (全員の中で)');
    }

    // --- Stage 8: 受動態 ---
    if (stageId === 8 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'This letter ( ) written by Ken.', 'was', ['was','is','were','did'], '過去の受動態');
        add('choice', 'English is ( ) in many countries.', 'spoken', ['spoken','speak','spoke','speaking'], 'be + 過去分詞');
        add('choice', 'These cars were ( ) in Japan.', 'made', ['made','make','making','makes'], 'were made');
        add('sort', 'この部屋は毎日掃除されます。', 'This room is cleaned every day', ['This','room','is','cleaned','every','day'], 'is cleaned');
        add('sort', 'その本は夏目漱石によって書かれました。', 'The book was written by Soseki Natsume', ['The','book','was','written','by','Soseki','Natsume'], 'was written by');
        add('sort', 'オーストラリアでは何語が話されていますか？', 'What language is spoken in Australia', ['What','language','is','spoken','in','Australia'], 'is spoken');
        add('fill', 'この机は木で作られています。 This desk ( ) made of wood.', 'is', null, 'is made of');
        add('fill', 'この歌はみんなに愛されています。 This song is ( ) by everyone.', 'loved', null, 'is loved');
        add('full', 'この寺はいつ建てられましたか？', 'When was this temple built?', null, 'When was ... built');
        add('full', 'その店は8時に閉められます。', 'The shop is closed at eight.', null, 'is closed');
        add('choice', 'We ( ) invited to the party.', 'were', ['were','was','did','had'], 'We were ~');
        add('sort', 'このケーキは母によって作られましたか？', 'Was this cake made by your mother', ['Was','this','cake','made','by','your','mother'], 'Was ... made');
        add('full', 'あの星は英語で何と呼ばれていますか？', 'What is that star called in English?', null, 'What is ... called');
        add('full', 'バターは牛乳から作られます。', 'Butter is made from milk.', null, 'is made from (原料)');
        add('full', '私はそのニュースに驚きました。', 'I was surprised at the news.', null, 'be surprised at (連語)');
    }

    // --- Stage 9: 重要表現 ---
    if (stageId === 9 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I don\'t know ( ) to swim.', 'how', ['how','what','where','when'], 'how to (泳ぎ方)');
        add('choice', 'Please tell me ( ) to go.', 'where', ['where','what','which','who'], 'where to (どこへ行くべきか)');
        add('choice', 'I asked him ( ) help me.', 'to', ['to','for','of','in'], 'ask 人 to');
        add('sort', '私は何をすべきかわかりません。', 'I do not know what to do', ['I','do','not','know','what','to','do'], 'what to do');
        add('sort', '父は私に部屋を掃除するように言いました。', 'My father told me to clean the room', ['My','father','told','me','to','clean','the','room'], 'tell 人 to');
        add('sort', '手伝ってくれませんか？', 'Will you please help me', ['Will','you','please','help','me'], 'Will you please');
        add('fill', 'コンピュータの使い方を教えてください。 Please teach me ( ) to use a computer.', 'how', null, 'how to');
        add('fill', 'もっと一生懸命勉強しなさい。 Study ( ) hard.', 'harder', null, 'harder (比較の命令)');
        add('full', '私は彼にドアを開けるように頼みました。', 'I asked him to open the door.', null, 'ask him to');
        add('full', 'この機械の使い方がわかりません。', "I don't know how to use this machine.", null, "don't know how to");
        add('choice', 'It is easy ( ) me to read this book.', 'for', ['for','of','to','at'], 'easy for 人 to');
        add('sort', 'あなたにとって早起きすることは難しいですか？', 'Is it difficult for you to get up early', ['Is','it','difficult','for','you','to','get','up','early'], 'it ... for ... to');
        add('full', '先生は生徒たちに静かにするように言いました。', 'The teacher told the students to be quiet.', null, 'tell ... to be quiet');
        add('full', '私の夢は世界中を旅することです。', 'My dream is traveling around the world.', null, 'traveling (動名詞)');
        add('full', 'お会いできてうれしいです。', 'I am glad to see you.', null, 'glad to');
    }

    // --- Stage 10: 総復習 ---
    if (stageId === 10 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'Have you ( ) been to Kyoto?', 'ever', ['ever','never','yet','since'], '現在完了(経験)');
        add('choice', 'I must ( ) my homework.', 'finish', ['finish','finishing','to finish','finished'], 'must + 原形');
        add('choice', 'Walking is ( ) than running.', 'easier', ['easier','easy','easiest','more easy'], '動名詞 + 比較');
        add('sort', '英語を話すことは私にとって楽しい。', 'Speaking English is fun for me', ['Speaking','English','is','fun','for','me'], 'Speaking (主語)');
        add('sort', 'この手紙は誰によって書かれましたか？', 'By whom was this letter written', ['By','whom','was','this','letter','written'], 'By whom (受動態疑問詞)');
        add('fill', '私は将来、医者になりたい。 I want ( ) be a doctor in the future.', 'to', null, 'want to be');
        add('fill', '彼女は昨日学校を休みました。 She was ( ) from school yesterday.', 'absent', null, 'be absent from');
        add('full', '私は宿題を終わらせなければなりません。', 'I have to finish my homework.', null, 'have to');
        add('full', 'もし明日晴れたら、私たちは釣りに行きます。', 'If it is sunny tomorrow, we will go fishing.', null, 'If + will');
        add('full', '私に水を持ってきてくれませんか？', 'Will you please bring me some water?', null, 'bring me');
        add('full', '彼は歴史に興味があります。', 'He is interested in history.', null, 'be interested in');
        add('full', 'そのニュースを聞いて驚きました。', 'I was surprised to hear the news.', null, 'surprised to hear');
        add('full', 'トムは有名なサッカー選手になるでしょう。', 'Tom will be a famous soccer player.', null, 'will be');
    }

    // --- Stage 12: EX (中2難問記述) ---
    if (stageId === 12) {
        add('full', '私の父は私が帰宅した時、新聞を読んでいました。', 'My father was reading the newspaper when I got home.', null, '過去進行形 + when');
        add('full', '私は、英語は私たちにとって最も重要な科目だと思います。', 'I think that English is the most important subject for us.', null, 'think that + 最上級');
        add('full', '京都には訪れるべき面白い場所がたくさんあります。', 'There are a lot of interesting places to visit in Kyoto.', null, 'There are + 形容詞的用法');
        add('full', '私は夕食の前に宿題をやり終えなければなりません。', 'I have to finish doing my homework before dinner.', null, 'have to + finish ~ing');
        add('full', '卵を使わずにケーキを作る方法を知っていますか？', 'Do you know how to make a cake without using eggs?', null, 'how to + without ~ing');
        add('full', 'もし明日暇なら、私と一緒に買い物に行きませんか？', 'If you are free tomorrow, will you go shopping with me?', null, 'If + will you ~');
        add('full', 'この歌は10年前に有名な歌手によって書かれました。', 'This song was written by a famous singer ten years ago.', null, '受動態 + 時間');
        add('full', '彼は友達に会うことができなかったので、悲しそうに見えました。', 'He looked sad because he could not meet his friend.', null, 'look + 形 + because');
        add('full', '私にとって、朝早く起きることは難しいです。', 'It is difficult for me to get up early in the morning.', null, 'It is ... for ... to');
        add('full', '次に何をすべきか私に教えてください。', 'Please tell me what to do next.', null, 'tell me what to do');
        add('full', '私はあなたに私の部屋に入ってほしくありません。', 'I do not want you to come into my room.', null, 'want A to ~ (否定)');
        add('full', 'あなたはどれくらい長く日本に住んでいますか？', 'How long have you lived in Japan?', null, '現在完了(継続)');
        add('full', 'この映画は世界中の人々に愛されています。', 'This movie is loved by people all over the world.', null, '受動態 + 連語');
        add('full', '彼らはその時、公園でサッカーをして楽しみました。', 'They enjoyed playing soccer in the park then.', null, 'enjoy ~ing');
        add('full', '私は弟より速く走ることができます。', 'I can run faster than my brother.', null, 'can + 比較級');
        return q;
    }

    return q;
}

// --- ゲーム変数 ---
let gameState = {
    mode: '', 
    stageId: 1,
    queue: [],
    qIndex: 0,
    score: 0,
    combo: 0,
    mistakes: [],
    hp: 3,
    maxHp: 3,
    expGained: 0,
    goldGained: 0,
    endlessWave: 0,
    endlessCorrectCount: 0, 
    writeCorrectCount: 0,
    shieldActive: false,
    pencilUsed: false,
    coinActive: false, 
    debugClicks: 0
};

// --- セーブデータ管理 ---
function loadGameData() {
    let data = localStorage.getItem(SAVE_KEY);
    let parsed = data ? JSON.parse(data) : {};
    return {
        cleared: parsed.cleared || [],
        achieved: parsed.achieved || [],
        level: parsed.level || 1,
        exp: parsed.exp || 0,
        gold: parsed.gold || 0,
        items: {
            potion: (parsed.items && parsed.items.potion) || 0,
            bomb: (parsed.items && parsed.items.bomb) || 0,
            hint: (parsed.items && parsed.items.hint) || 0,
            pencil: (parsed.items && parsed.items.pencil) || 0,
            shield: (parsed.items && parsed.items.shield) || 0,
            coin: (parsed.items && parsed.items.coin) || 0
        },
        totalSolved: parsed.totalSolved || 0,
        writeCount: parsed.writeCount || 0,
        maxEndlessScore: parsed.maxEndlessScore || 0 
    };
}
let saveData = loadGameData();

function getNextLevelExp(level) { return level * 50; } 

window.onload = () => {
    updateTitleStats();
    updateStageList();
    document.getElementById('game-title').onclick = () => {
        if(++gameState.debugClicks >= 7) {
            document.getElementById('debug-btn').classList.remove('hidden');
            unlockAchievement('creator');
        }
    };
    gameState.debugClicks = 0;
};

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'screen-stages') {
        const goldEl = document.getElementById('stage-gold');
        if(goldEl) goldEl.innerText = saveData.gold;
    }
}

function updateTitleStats() {
    const nextExp = getNextLevelExp(saveData.level);
    document.getElementById('title-level').innerText = saveData.level;
    document.getElementById('title-next-exp').innerText = nextExp - saveData.exp;
    const pct = Math.min(100, (saveData.exp / nextExp) * 100);
    document.getElementById('title-exp-bar').style.width = `${pct}%`;
    
    // エンドレス最大記録の表示
    const recEl = document.getElementById('endless-record-display');
    if(recEl) recEl.innerText = `Endless Best: ${saveData.maxEndlessScore} 問`;
}

function updateStageList() {
    const list = document.getElementById('stage-list');
    list.innerHTML = '';
    const maxStage = saveData.cleared.length >= 11 ? 12 : 11;

    for(let i=1; i<=maxStage; i++) {
        const btn = document.createElement('button');
        const isLocked = i > 1 && !saveData.cleared.includes(i-1);
        btn.innerText = `Stage ${i}: ${STAGE_TITLES[i]}`;
        if(saveData.cleared.includes(i)) btn.innerText += " ✅";
        
        if(isLocked) {
            btn.classList.add('locked');
            btn.disabled = true;
            btn.innerText = "🔒 Locked";
        } else {
            btn.onclick = () => startStage(i);
        }
        list.appendChild(btn);
    }
    
    // エンドレスモード解放処理
    const endBtn = document.getElementById('btn-endless');
    const recEl = document.getElementById('endless-record-display');
    
    if(saveData.cleared.includes(11)) { 
        endBtn.classList.remove('locked');
        endBtn.classList.remove('hidden');
        endBtn.innerText = "♾️ エンドレスモード";
        endBtn.disabled = false;
        if(recEl) recEl.classList.remove('hidden'); 
    } else {
        endBtn.classList.add('locked');
        endBtn.classList.add('hidden');
        endBtn.disabled = true;
        if(recEl) recEl.classList.add('hidden'); 
    }
    
    const goldEl = document.getElementById('stage-gold');
    if(goldEl) goldEl.innerText = saveData.gold;
}

// --- ショップ機能 ---
function showShop() {
    showScreen('screen-shop');
    updateShopUI();
}

function updateShopUI() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    
    setTxt('shop-gold', `${saveData.gold} G`);
    setTxt('inv-potion', saveData.items.potion);
    setTxt('inv-bomb', saveData.items.bomb);
    setTxt('inv-hint', saveData.items.hint);
    setTxt('inv-pencil', saveData.items.pencil);
    setTxt('inv-shield', saveData.items.shield);
    setTxt('inv-coin', saveData.items.coin);
}

function buyItem(item, price) {
    if(saveData.gold >= price) {
        saveData.gold -= price;
        saveData.items[item] = (saveData.items[item] || 0) + 1;
        saveGame();
        updateShopUI();
    } else {
        alert("ゴールドが足りません！");
    }
}

// --- アイテム使用 ---
function updateItemButtons() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    
    setTxt('game-inv-potion', saveData.items.potion || 0);
    setTxt('game-inv-bomb', saveData.items.bomb || 0);
    setTxt('game-inv-hint', saveData.items.hint || 0);
    setTxt('game-inv-pencil', saveData.items.pencil || 0);
    setTxt('game-inv-shield', saveData.items.shield || 0);
    setTxt('game-inv-coin', saveData.items.coin || 0);
    
    const currentQ = gameState.queue[gameState.qIndex];
    if(!currentQ) return;

    const btnPotion = document.getElementById('btn-use-potion');
    if(btnPotion) btnPotion.disabled = !(saveData.items.potion > 0 && gameState.hp < gameState.maxHp);

    const btnBomb = document.getElementById('btn-use-bomb');
    if(btnBomb) btnBomb.disabled = !(saveData.items.bomb > 0 && currentQ.type === 'choice');
    
    const btnHint = document.getElementById('btn-use-hint');
    if(btnHint) btnHint.disabled = !(saveData.items.hint > 0 && (currentQ.type === 'fill' || currentQ.type === 'full' || currentQ.type === 'sort'));
    
    const btnPencil = document.getElementById('btn-use-pencil');
    if(btnPencil) btnPencil.disabled = !(saveData.items.pencil > 0 && !gameState.pencilUsed && (currentQ.type === 'fill' || currentQ.type === 'full'));
    
    const btnShield = document.getElementById('btn-use-shield');
    if(btnShield) btnShield.disabled = !(saveData.items.shield > 0 && !gameState.shieldActive);
    
    const btnCoin = document.getElementById('btn-use-coin');
    if(btnCoin) btnCoin.disabled = !(saveData.items.coin > 0 && !gameState.coinActive);
}

function usePotion() {
    if(saveData.items.potion > 0 && gameState.hp < gameState.maxHp) {
        saveData.items.potion--;
        gameState.hp++;
        updateHpBar();
        updateItemButtons();
        unlockAchievement('item_user');
        saveGame();
    }
}

function useBomb() {
    if(saveData.items.bomb > 0) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'choice') {
            saveData.items.bomb--;
            saveGame();
            const container = document.getElementById('choices-container');
            const buttons = Array.from(container.children);
            let removed = 0;
            for(let btn of buttons) {
                if(btn.innerText !== q.a) {
                    btn.style.visibility = 'hidden';
                    removed++;
                    if(removed >= 2) break;
                }
            }
            updateItemButtons();
        }
    }
}

function useHint() {
    if(saveData.items.hint > 0) {
        saveData.items.hint--;
        saveGame();
        unlockAchievement('item_user');
        
        const q = gameState.queue[gameState.qIndex];
        
        if(q.type === 'sort') {
            alert(`最初の単語は "${q.a.split(' ')[0]}" です`);
        } else if(q.type === 'fill' || q.type === 'full') {
            const words = q.a.split(' ');
            const firstWord = words[0];
            const inp = document.getElementById('writing-input');
            inp.value = firstWord + " ";
            inp.focus();
            
            let hintPattern = words.map(w => w[0] + "_".repeat(Math.max(0, w.length-1))).join(' ');
            hintPattern = hintPattern.replace(/_/g, '_');
            document.getElementById('writing-hint').innerText = "Hint: " + hintPattern;
        }
        updateItemButtons();
    }
}

function usePencil() {
    if(saveData.items.pencil > 0 && !gameState.pencilUsed) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'fill' || q.type === 'full') {
            saveData.items.pencil--;
            gameState.pencilUsed = true;
            saveGame();
            
            let dummies = ["I don't know.", "She is happy.", "He plays tennis."];
            if(gameState.queue.length > 3) {
                dummies = gameState.queue.filter(bq => bq !== q).slice(0,3).map(bq => bq.a);
            }
            
            document.getElementById('writing-container').classList.add('hidden');
            const c = document.getElementById('choices-container');
            c.classList.remove('hidden');
            c.innerHTML = '';
            
            let opts = [q.a, ...dummies].sort(() => Math.random() - 0.5);
            opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt === q.a, q);
                c.appendChild(btn);
            });
            updateItemButtons();
        }
    }
}

function useShield() {
    if(saveData.items.shield > 0 && !gameState.shieldActive) {
        saveData.items.shield--;
        gameState.shieldActive = true;
        document.getElementById('shield-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

function useCoin() {
    if(saveData.items.coin > 0 && !gameState.coinActive) {
        saveData.items.coin--;
        gameState.coinActive = true;
        document.getElementById('coin-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

function initGame(mode) {
    gameState.mode = mode;
    gameState.queue = []; // ★重要修正: 問題リストを必ずリセット
    gameState.score = 0;
    gameState.combo = 0;
    gameState.qIndex = 0;
    gameState.mistakes = [];
    gameState.hp = 3;
    gameState.maxHp = 3;
    gameState.expGained = 0;
    gameState.goldGained = 0;
    gameState.endlessWave = 1;
    gameState.endlessCorrectCount = 0; 
    gameState.writeCorrectCount = 0;
    gameState.shieldActive = false;
    gameState.pencilUsed = false;
    gameState.coinActive = false;
    updateHpBar();
    showScreen('screen-game');
    updateItemButtons();
    
    // 赤色バグ修正
    const qArea = document.getElementById('question-area');
    if(qArea) {
        qArea.classList.remove('anim-wrong');   
        qArea.classList.remove('anim-correct'); 
        qArea.style.borderColor = "#dfe6e9";    
    }

    const gameScreen = document.getElementById('screen-game');
    gameScreen.classList.remove('boss-mode');
    document.getElementById('boss-overlay').classList.add('hidden');
    document.getElementById('shield-overlay').classList.add('hidden');
    document.getElementById('coin-overlay').classList.add('hidden');
}

function startStage(id) {
    initGame('stage');
    gameState.stageId = id;
    
    let pool = [];
    if(id === 12) {
        pool = getStageData(12);
        gameState.queue = pool.sort(() => Math.random() - 0.5).slice(0, 15);
    } else {
        let pool = (id === 11) ? [] : getStageData(id);
        if(id === 11) for(let i=1; i<=10; i++) pool = pool.concat(getStageData(i));

        const choices = pool.filter(q => q.type === 'choice');
        const sorts = pool.filter(q => q.type === 'sort');
        const writes = pool.filter(q => q.type === 'fill' || q.type === 'full');
        const pick = (arr, n) => arr.sort(() => Math.random() - 0.5).slice(0, n);
        
        let set = [];
        set = set.concat(pick(choices, 4));
        set = set.concat(pick(sorts, 3));
        set = set.concat(pick(writes, 3));
        
        while(set.length < 10 && pool.length >= 10) {
            let c = pool[Math.floor(Math.random()*pool.length)];
            if(!set.some(s=>s.id===c.id)) set.push(c);
        }
        gameState.queue = set.sort(() => Math.random() - 0.5);
    }
    
    if(gameState.queue.length === 0) { alert("Data Error"); return; }
    document.getElementById('q-category').innerText = `Stage ${id}`;
    showQuestion();
}

function startEndless() {
    initGame('endless');
    addEndlessQuestions();
    showQuestion();
}

function addEndlessQuestions() {
    let pool = [];
    // Stage 12 (EX) を除く 1〜11 から出題
    for(let i=1; i<=11; i++) {
        pool = pool.concat(getStageData(i));
    }
    // ★重要: ここで強力にシャッフル
    pool = shuffleArray(pool);
    // 先頭10問を追加
    gameState.queue = gameState.queue.concat(pool.slice(0, 10));
}

// --- 問題表示 ---
function showQuestion() {
    if (gameState.mode === 'endless' && gameState.qIndex >= gameState.queue.length) {
        showEndlessModal();
        return;
    }
    if (gameState.qIndex >= gameState.queue.length) {
        finishGame(true);
        return;
    }

    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);
    const gameScreen = document.getElementById('screen-game');
    const bossOverlay = document.getElementById('boss-overlay');
    
    if(isBoss) {
        gameScreen.classList.add('boss-mode');
        bossOverlay.classList.remove('hidden');
        setTimeout(() => bossOverlay.classList.add('hidden'), 2000);
    } else {
        gameScreen.classList.remove('boss-mode');
        bossOverlay.classList.add('hidden');
    }

    const q = gameState.queue[gameState.qIndex];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('q-type-badge').innerText = getTypeLabel(q.type);

    if (gameState.mode === 'endless') {
        document.getElementById('q-category').innerText = `正解数: ${gameState.endlessCorrectCount} (Best: ${saveData.maxEndlessScore})`;
    } else {
        document.getElementById('q-category').innerText = `Stage ${gameState.stageId}`;
    }

    const total = gameState.queue.length;
    const pct = ((gameState.qIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    ['choices-container', 'sort-container', 'writing-container'].forEach(id => 
        document.getElementById(id).classList.add('hidden')
    );
    document.getElementById('writing-status').classList.add('hidden');
    document.getElementById('writing-hint').innerText = ""; 
    updateItemButtons();

    if(q.type === 'choice') {
        const c = document.getElementById('choices-container');
        c.classList.remove('hidden');
        c.innerHTML = '';
        let opts = shuffleArray([...q.o]);
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(opt === q.a, q);
            c.appendChild(btn);
        });
    } else if(q.type === 'sort') {
        const c = document.getElementById('sort-container');
        c.classList.remove('hidden');
        gameState.sortAns = [];
        gameState.shuffledSortOptions = shuffleArray([...q.o]);
        renderSortUI(q);
    } else {
        const c = document.getElementById('writing-container');
        c.classList.remove('hidden');
        const ws = document.getElementById('writing-status');
        const wordCount = q.a.trim().split(/\s+/).length;
        ws.innerText = `単語数: ${wordCount}`;
        ws.classList.remove('hidden');
        const inp = document.getElementById('writing-input');
        inp.value = '';
        inp.focus();
        inp.onkeydown = (e) => { if(e.key==='Enter') checkWritingAnswer(); };
    }
}

function getTypeLabel(t) {
    if(t==='choice') return '4択';
    if(t==='sort') return '並び替え';
    return '記述';
}

function normalizeText(text) {
    let t = text.toLowerCase().trim();
    t = t.replace(/[.?!,]/g, ''); 
    t = t.replace(/\s+/g, ' ');   
    const maps = {
        "don't": "do not", "doesn't": "does not", "didn't": "did not",
        "can't": "cannot", "won't": "will not", "isn't": "is not", "aren't": "are not",
        "wasn't": "was not", "weren't": "were not", "shouldn't": "should not", "mustn't": "must not",
        "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
        "we're": "we are", "they're": "they are", "it's": "it is", "that's": "that is",
        "let's": "let us"
    };
    for (let key in maps) {
        const regex = new RegExp(`\\b${key.replace("'", "")}\\b`, 'g'); 
        t = t.replace(key, maps[key]);
    }
    return t;
}

function checkAnswer(isCorrect, q) {
    const area = document.getElementById('question-area');
    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);

    if(isCorrect) {
        gameState.score += 10 + gameState.combo;
        gameState.combo++;
        gameState.expGained += 20;
        
        if(gameState.mode === 'endless') {
            gameState.endlessCorrectCount++;
            if(gameState.endlessCorrectCount > saveData.maxEndlessScore) {
                saveData.maxEndlessScore = gameState.endlessCorrectCount;
                saveGame();
            }
        }

        let gold = 20; 
        if(isBoss) { gold += 50; gameState.expGained += 50; unlockAchievement('boss_killer'); }
        gameState.goldGained += gold;

        if(q.type === 'full' || q.type === 'fill') gameState.writeCorrectCount++;
        area.classList.add('anim-correct');
        document.getElementById('score-display').innerText = `Score: ${gameState.score}`;
        checkInGameAchievements();
        setTimeout(() => {
            area.classList.remove('anim-correct');
            gameState.qIndex++;
            showQuestion();
        }, 500);
    } else {
        if(gameState.shieldActive) {
            gameState.shieldActive = false;
            document.getElementById('shield-overlay').classList.add('hidden');
            alert("🛡️ Shield blocked the damage!");
            gameState.combo = 0;
            area.classList.add('anim-wrong');
            setTimeout(() => {
                area.classList.remove('anim-wrong');
                showExplanation(q);
            }, 500);
        } else {
            let dmg = isBoss ? 2 : 1;
            gameState.hp -= dmg;
            updateHpBar();
            gameState.combo = 0;
            gameState.mistakes.push(q);
            area.classList.add('anim-wrong');
            
            if(gameState.hp <= 0) {
                setTimeout(() => finishGame(false), 500);
            } else {
                setTimeout(() => {
                    area.classList.remove('anim-wrong');
                    showExplanation(q);
                }, 500);
            }
        }
    }
}

function renderSortUI(q) {
    const area = document.getElementById('sort-answer-area');
    const opts = document.getElementById('sort-options-area');
    area.innerHTML = ''; opts.innerHTML = '';
    gameState.sortAns.forEach(w => {
        const sp = document.createElement('span');
        sp.className = 'sort-word';
        sp.innerText = w;
        area.appendChild(sp);
    });
    let remaining = [...q.o];
    gameState.sortAns.forEach(w => {
        const idx = remaining.indexOf(w);
        if(idx > -1) remaining.splice(idx, 1);
    });
    gameState.shuffledSortOptions.forEach(w => {
        if(remaining.includes(w)) {
            const btn = document.createElement('button');
            btn.className = 'btn-small';
            btn.innerText = w;
            btn.onclick = () => {
                gameState.sortAns.push(w);
                renderSortUI(q);
                if(gameState.sortAns.length === q.o.length) checkAnswer(gameState.sortAns.join(' ') === q.a, q);
            };
            opts.appendChild(btn);
            const idx = remaining.indexOf(w);
            if(idx > -1) remaining.splice(idx, 1);
        }
    });
}
function resetSort() { 
    gameState.sortAns = []; 
    gameState.shuffledSortOptions = shuffleArray([...gameState.queue[gameState.qIndex].o]);
    renderSortUI(gameState.queue[gameState.qIndex]); 
}
function checkWritingAnswer() {
    const val = document.getElementById('writing-input').value.trim();
    const q = gameState.queue[gameState.qIndex];
    const normUser = normalizeText(val);
    const normAns = normalizeText(q.a);
    checkAnswer(normUser === normAns, q);
}
function updateHpBar() {
    const pct = Math.max(0, (gameState.hp / gameState.maxHp) * 100);
    const bar = document.getElementById('hp-bar-fill');
    bar.style.width = `${pct}%`;
    bar.style.backgroundColor = gameState.hp <= 1 ? '#d63031' : '#00b894';
}
function showExplanation(q) {
    const m = document.getElementById('explanation-modal');
    document.getElementById('expl-answer').innerText = q.a;
    document.getElementById('expl-text').innerText = q.expl || "No explanation.";
    m.classList.remove('hidden');
}
function closeExplanation() {
    document.getElementById('explanation-modal').classList.add('hidden');
    gameState.qIndex++;
    showQuestion();
}
function showEndlessModal() { document.getElementById('endless-modal').classList.remove('hidden'); }

// --- エンドレス継続処理 ---
function continueEndless() {
    document.getElementById('endless-modal').classList.add('hidden');
    gameState.hp = gameState.maxHp; // 体力全回復
    updateHpBar();
    addEndlessQuestions();
    showQuestion();
}

function finishGame(isClear) {
    document.getElementById('endless-modal').classList.add('hidden');

    showScreen('screen-result');
    const title = document.getElementById('result-title');
    const badge = document.getElementById('rank-badge');
    const msg = document.getElementById('levelup-msg');
    msg.classList.add('hidden');

    if(!isClear) {
        title.innerText = "GAME OVER";
        title.style.color = "#d63031";
        badge.innerText = "F";
        badge.className = "rank-F";
        unlockAchievement('rank_f');
    } else {
        title.innerText = "QUEST CLEAR!";
        title.style.color = "#2d3436";
        const rate = (gameState.queue.length - gameState.mistakes.length) / gameState.queue.length; 
        let rank = 'C';
        if(rate >= 1.0) rank = 'S';
        else if(rate >= 0.8) rank = 'A';
        else if(rate >= 0.6) rank = 'B';
        badge.innerText = rank;
        badge.className = `rank-${rank}`;
        
        saveData.totalSolved += (gameState.qIndex - gameState.mistakes.length);
        saveData.writeCount += gameState.writeCorrectCount;

        if(gameState.mode === 'stage' && rank !== 'C') {
            if(!saveData.cleared.includes(gameState.stageId)) {
                saveData.cleared.push(gameState.stageId);
                unlockAchievement(`c${gameState.stageId}`);
                gameState.goldGained += 500; 
            }
        }
        
        if(rank === 'S') { unlockAchievement('rank_s'); gameState.goldGained += 300; }
        if(gameState.mistakes.length === 0) unlockAchievement('no_miss');
        if(gameState.hp === gameState.maxHp) unlockAchievement('full_hp');
        if(gameState.hp === 1) unlockAchievement('survivor');

        if(gameState.coinActive) {
            gameState.goldGained *= 2;
        }
    }

    saveData.gold += gameState.goldGained;
    document.getElementById('result-gold').innerText = `+${gameState.goldGained} G` + (gameState.coinActive && isClear ? " (x2)" : "");
    if(saveData.gold >= 1000) unlockAchievement('rich');

    processExp();
    checkGlobalAchievements();
    saveGame();
    updateStageList();
    updateTitleStats();
}

function checkInGameAchievements() {
    if(gameState.combo >= 10) unlockAchievement('combo_10');
    if(gameState.combo >= 30) unlockAchievement('combo_30');
    if(gameState.combo >= 50) unlockAchievement('combo_50');
    if(gameState.mode === 'endless') {
        const count = gameState.endlessCorrectCount;
        if(count >= 10) unlockAchievement('end_10');
        if(count >= 30) unlockAchievement('end_30');
    }
}
function checkGlobalAchievements() {
    if(saveData.totalSolved >= 50) unlockAchievement('total_50');
    if(saveData.totalSolved >= 100) unlockAchievement('total_100');
    if(saveData.totalSolved >= 300) unlockAchievement('total_300');
    if(saveData.totalSolved >= 500) unlockAchievement('total_500');
    if(saveData.totalSolved >= 1000) unlockAchievement('total_1000');
    if(saveData.level >= 5) unlockAchievement('level_5');
    if(saveData.level >= 10) unlockAchievement('level_10');
    if(saveData.level >= 20) unlockAchievement('level_20');
    if(saveData.writeCount >= 10) unlockAchievement('writer');
    const h = new Date().getHours();
    if(h >= 0 && h <= 4) unlockAchievement('night_owl');
}
function unlockAchievement(id) {
    if(!saveData.achieved.includes(id)) {
        saveData.achieved.push(id);
        const a = ACHIEVEMENTS.find(x => x.id === id);
        if(a) { const name = (a.hidden) ? a.name : a.name; alert(`🏆 称号獲得: ${name}\n${a.desc}`); }
        saveGame();
    }
}
function processExp() {
    const gained = gameState.expGained;
    saveData.exp += gained;
    document.getElementById('result-exp').innerText = `+${gained} EXP`;
    let leveledUp = false;
    while(true) {
        const need = getNextLevelExp(saveData.level);
        if(saveData.exp >= need) {
            saveData.exp -= need;
            saveData.level++;
            leveledUp = true;
        } else { break; }
    }
    const nextNeed = getNextLevelExp(saveData.level);
    const pct = (saveData.exp / nextNeed) * 100;
    document.getElementById('result-exp-bar').style.width = `${pct}%`;
    if(leveledUp) document.getElementById('levelup-msg').classList.remove('hidden');
}
function saveGame() { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); }
function showAchievements() {
    showScreen('screen-achievements');
    const list = document.getElementById('achievement-list');
    list.innerHTML = '';
    const stats = document.getElementById('achievement-stats');
    const unlocked = saveData.achieved.length;
    stats.innerText = `獲得数: ${unlocked} / ${ACHIEVEMENTS.length}`;
    ACHIEVEMENTS.forEach(a => {
        const u = saveData.achieved.includes(a.id);
        const div = document.createElement('div');
        div.className = `achievement-card ${u?'unlocked':''}`;
        const name = a.name;
        const desc = (a.hidden && !u) ? "???" : a.desc;
        div.innerHTML = `<div class="achieve-icon">${u?a.icon:'🔒'}</div><div><div style="font-weight:bold">${name}</div><div style="font-size:0.8rem; color:#636e72">${desc}</div></div>`;
        list.appendChild(div);
    });
}
function confirmQuit() { if(confirm("あきらめますか？")) showScreen('screen-title'); }
function retryGame() { if(gameState.mode==='stage') startStage(gameState.stageId); else startEndless(); }
function nextStage() { startStage(gameState.stageId + 1); }
function toggleDebugMenu() { document.getElementById('debug-menu').classList.toggle('hidden'); }
function debugUnlockAll() { 
    saveData.cleared=[1,2,3,4,5,6,7,8,9,10,11,12]; 
    saveData.level = 20; saveData.gold+=10000;
    saveGame(); updateStageList(); updateTitleStats(); 
    alert("全開放しました！"); 
}
function debugReset() { 
    if(confirm("【重要】全てのデータを消去して初期化しますか？")) { 
        localStorage.clear();
        saveData = {
            cleared: [], achieved: [], level: 1, exp: 0, gold: 0,
            items: { potion: 0, bomb: 0, hint: 0, pencil: 0, shield: 0, coin: 0 },
            totalSolved: 0, writeCount: 0
        };
        saveGame();
        
        gameState = {
            mode: '', stageId: 1, queue: [], qIndex: 0, score: 0, combo: 0, mistakes: [],
            hp: 3, maxHp: 3, expGained: 0, goldGained: 0, endlessWave: 0,
            writeCorrectCount: 0, shieldActive: false, pencilUsed: false, coinActive: false, debugClicks: 0
        };
        
        showScreen('screen-title');
        updateStageList();
        updateTitleStats();
        alert("データを初期化しました。");
    } 
}
