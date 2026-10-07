export interface StageQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Map of trackId -> stageNumber (1..6) -> 5 questions
export const STAGE_QUIZZES: Record<string, Record<number, StageQuestion[]>> = {
  'lang-spanish': {
    1: [
      {
        id: 'es-s1-q1',
        question: 'How do you say "Hello, how are you?" formally in Spanish?',
        options: ['Hola, ¿cómo estás?', 'Hola, ¿cómo está usted?', 'Adiós, ¿qué tal?', 'Buenos días, ¿dónde estás?'],
        correctIndex: 1,
        explanation: '"¿Cómo está usted?" is the formal register using the third-person singular pronoun "usted", appropriate for professional workplace introductions.'
      },
      {
        id: 'es-s1-q2',
        question: 'Which Spanish verb is used to express permanent characteristics such as one\'s profession (e.g. "I am a software engineer")?',
        options: ['Estar (Estoy ingeniero)', 'Tener (Tengo ingeniero)', 'Ser (Soy ingeniero)', 'Hacer (Hago ingeniero)'],
        correctIndex: 2,
        explanation: '"Ser" is used for permanent identity, origin, and professions (Soy ingeniero de software), whereas "Estar" is reserved for temporary states and locations.'
      },
      {
        id: 'es-s1-q3',
        question: 'Which of the following is the correct translation of the number "75" in Spanish?',
        options: ['Sesenta y cinco', 'Setenta y cinco', 'Ochenta y cinco', 'Cincuenta y siete'],
        correctIndex: 1,
        explanation: '70 is "setenta" and 5 is "cinco", making 75 "setenta y cinco" (often confused with sesenta = 60).'
      },
      {
        id: 'es-s1-q4',
        question: 'Which pronoun replaces a masculine plural direct object (e.g. "los servidores") in Spanish?',
        options: ['Las', 'Les', 'Los', 'Se'],
        correctIndex: 2,
        explanation: 'Direct object pronoun for masculine plural nouns ("los servidores") is "los" (e.g., "Los reinicié" = I restarted them).'
      },
      {
        id: 'es-s1-q5',
        question: 'How do you say "Good morning everyone, let us begin the meeting" in Spanish?',
        options: [
          'Buenas noches a todos, terminamos la reunión.',
          'Buenos días a todos, empecemos la reunión.',
          'Hola a todos, cerramos el servidor.',
          'Hasta luego amigos, comencemos el código.'
        ],
        correctIndex: 1,
        explanation: '"Buenos días a todos, empecemos la reunión" uses the polite cohortative subjunctive "empecemos" (let us begin) and proper workplace greeting.'
      }
    ],
    2: [
      {
        id: 'es-s2-q1',
        question: 'In a morning standup, how do you say "Yesterday I fixed the authentication bug"?',
        options: [
          'Ayer arreglo el error de autenticación.',
          'Ayer arreglé el error de autenticación.',
          'Mañana arreglaré el error de autenticación.',
          'Ayer arreglaba sin errores.'
        ],
        correctIndex: 1,
        explanation: '"Ayer arreglé" uses the preterite tense (pretérito indefinido) for an action completed in the past at a specific time.'
      },
      {
        id: 'es-s2-q2',
        question: 'What is the correct Spanish translation for "pull request"?',
        options: ['Petición de extracción (o pull request)', 'Empuje de rama', 'Solicitud de borrado', 'Cierre de ticket'],
        correctIndex: 0,
        explanation: 'In Spanish tech companies, "petición de extracción" or simply "pull request" is standard terminology.'
      },
      {
        id: 'es-s2-q3',
        question: 'How do you express a blocker: "I am blocked waiting for API access"?',
        options: [
          'Estoy libre para el acceso al API.',
          'Estoy bloqueado esperando el acceso a la API.',
          'Tengo prisa por el código del API.',
          'Voy a bloquear el acceso al servidor.'
        ],
        correctIndex: 1,
        explanation: '"Estoy bloqueado esperando el acceso a la API" accurately conveys an engineering dependency blocker.'
      },
      {
        id: 'es-s2-q4',
        question: 'Which preposition correctly indicates purpose or deadline (e.g. "for Friday")?',
        options: ['Por', 'Para', 'En', 'Hacia'],
        correctIndex: 1,
        explanation: '"Para" is used for specific deadlines, goals, and recipients (e.g., "Estará listo para el viernes").'
      },
      {
        id: 'es-s2-q5',
        question: 'How do you politely ask a teammate: "Could you review my code when you have a moment?"',
        options: [
          '¿Podrías revisar mi código cuando tengas un momento?',
          'Debes mirar mi código inmediatamente.',
          'Revisa el código ahora mismo sin falta.',
          '¿Quieres borrar mi código hoy?'
        ],
        correctIndex: 0,
        explanation: '"¿Podrías revisar mi código cuando tengas un momento?" uses the polite conditional "podrías" and subjunctive "tengas".'
      }
    ],
    3: [
      {
        id: 'es-s3-q1',
        question: 'In a code review, why is the subjunctive used in: "Es importante que verifiquemos los índices de la base de datos"?',
        options: [
          'Because it is an action in the past.',
          'Because impersonal expressions of importance trigger the subjunctive mood.',
          'Because it expresses absolute certainty.',
          'Because it is an informal command.'
        ],
        correctIndex: 1,
        explanation: 'Impersonal expressions like "Es importante que...", "Es necesario que..." require the subjunctive mood ("verifiquemos").'
      },
      {
        id: 'es-s3-q2',
        question: 'How do you say "memory leak" in technical Spanish?',
        options: ['Fuga de memoria', 'Líquido de memoria', 'Goteo de ram', 'Pérdida de procesador'],
        correctIndex: 0,
        explanation: '"Fuga de memoria" is the standardized technical Spanish term for a memory leak.'
      },
      {
        id: 'es-s3-q3',
        question: 'Translate: "If we optimize this query, the latency will decrease significantly."',
        options: [
          'Si optimizamos esta consulta, la latencia disminuirá significativamente.',
          'Si optimizáramos la consulta, la latencia aumenta mucho.',
          'Cuando optimicemos la consulta, la memoria se borra.',
          'Si optimizar consultas, la velocidad cae.'
        ],
        correctIndex: 0,
        explanation: 'The first conditional in Spanish uses "Si + presente de indicativo (optimizamos), futuro (disminuirá)".'
      },
      {
        id: 'es-s3-q4',
        question: 'What is the root cause analysis called in an incident postmortem?',
        options: ['Análisis de causa raíz', 'Informe de culpa rápida', 'Resumen de despido', 'Lista de quejas'],
        correctIndex: 0,
        explanation: '"Análisis de causa raíz" (RCA) is the industry standard phrase used in engineering postmortems.'
      },
      {
        id: 'es-s3-q5',
        question: 'Which phrase best suggests a refactoring alternative diplomatically?',
        options: [
          'Tu código no sirve para nada.',
          'Considero que podríamos desacoplar esta clase para mejorar la modularidad.',
          'Borra todo el archivo y hazlo de nuevo.',
          'Nadie escribe funciones tan largas.'
        ],
        correctIndex: 1,
        explanation: '"Considero que podríamos desacoplar esta clase..." provides respectful, objective, and constructive feedback.'
      }
    ],
    4: [
      {
        id: 'es-s4-q1',
        question: 'How do you say "Horizontal auto-scaling with high availability" in Spanish?',
        options: [
          'Autoescalado horizontal con alta disponibilidad',
          'Crecimiento plano con velocidad alta',
          'Escalamiento vertical sin respaldo',
          'Balanceo de carga manual'
        ],
        correctIndex: 0,
        explanation: '"Autoescalado horizontal con alta disponibilidad" is the exact cloud systems architecture terminology.'
      },
      {
        id: 'es-s4-q2',
        question: 'In distributed systems, what does "Tolerancia a fallos" refer to?',
        options: ['Zero bug policy in QA', 'Fault tolerance (system resilience against component crashes)', 'Hardware warranty terms', 'Fail-fast runtime exceptions'],
        correctIndex: 1,
        explanation: '"Tolerancia a fallos" means fault tolerance, enabling systems to continue operating despite node or disk failures.'
      },
      {
        id: 'es-s4-q3',
        question: 'During a P0 outage call, how does the incident commander state: "Let us rollback the deployment immediately"?',
        options: [
          'Revertamos el despliegue de inmediato.',
          'Esperemos a ver si el servidor se arregla solo.',
          'Cierren todas las cuentas de usuario.',
          'Despleguemos otra versión sin probar.'
        ],
        correctIndex: 0,
        explanation: '"Revertamos el despliegue de inmediato" delivers a decisive, authoritative command using the formal cohortative imperative.'
      },
      {
        id: 'es-s4-q4',
        question: 'What is the Spanish term for "throughput" in message broker or API context?',
        options: ['Rendimiento / Caudal de procesamiento', 'Latencia estática', 'Almacenamiento en disco', 'Ancho de pantalla'],
        correctIndex: 0,
        explanation: 'Throughput is translated as "rendimiento" or "caudal de procesamiento" (messages/sec).'
      },
      {
        id: 'es-s4-q5',
        question: 'Translate: "The distributed cache invalidation strategy ensures data consistency across regions."',
        options: [
          'La estrategia de invalidación de caché distribuida garantiza la consistencia de datos entre regiones.',
          'El caché guardado borra datos inconsistentes en el servidor.',
          'La memoria local distribuye consistencia sin regiones.',
          'La base de datos regional no necesita caché distribuido.'
        ],
        correctIndex: 0,
        explanation: 'This accurate translation preserves the cloud architecture terminology: "estrategia de invalidación de caché distribuida".'
      }
    ],
    5: [
      {
        id: 'es-s5-q1',
        question: 'In an executive presentation, which phrase best introduces an architectural trade-off?',
        options: [
          'Esto es barato pero muy malo.',
          'A pesar del costo inicial de infraestructura, reduciremos la deuda técnica en un 40%.',
          'No sabemos cuánto va a costar la nube.',
          'Los desarrolladores no quieren usar esta tecnología.'
        ],
        correctIndex: 1,
        explanation: '"A pesar del costo inicial..., reduciremos la deuda técnica..." frames trade-offs with persuasive executive rigor.'
      },
      {
        id: 'es-s5-q2',
        question: 'How do you negotiate a Service Level Agreement (SLA): "We commit to 99.95% uptime with 15-minute MTTR"?',
        options: [
          'Nos comprometemos a un 99.95% de tiempo de actividad con un MTTR de 15 minutos.',
          'Prometemos que el servidor nunca jamás fallará.',
          'El acuerdo de nivel de servicio dura quince días.',
          'No podemos garantizar la disponibilidad del sistema.'
        ],
        correctIndex: 0,
        explanation: '"Nos comprometemos a un 99.95% de tiempo de actividad..." matches professional enterprise SLA negotiation language.'
      },
      {
        id: 'es-s5-q3',
        question: 'During a system design interview whiteboard defense, how do you explain choosing eventual consistency?',
        options: [
          'Elegí consistencia eventual porque es más fácil de programar.',
          'Optamos por consistencia eventual para priorizar alta disponibilidad y baja latencia bajo el teorema CAP.',
          'La base de datos no soporta transacciones seguras.',
          'No importa si los usuarios ven datos desactualizados por horas.'
        ],
        correctIndex: 1,
        explanation: 'Referencing the CAP theorem and trade-offs demonstrates senior engineering communication.'
      },
      {
        id: 'es-s5-q4',
        question: 'What does "mitigar la deuda técnica acumulada" mean?',
        options: [
          'Pay off company bank loans',
          'Mitigate accumulated technical debt through proactive refactoring',
          'Fire underperforming engineers',
          'Reduce marketing budget'
        ],
        correctIndex: 1,
        explanation: 'Technical debt is "deuda técnica", and mitigating it is a common leadership topic.'
      },
      {
        id: 'es-s5-q5',
        question: 'How do you diplomatically push back on an unrealistic product deadline?',
        options: [
          'Es imposible y no lo voy a hacer.',
          'Para cumplir con los estándares de calidad y seguridad, sugiero escalonar la entrega en dos fases.',
          'Ustedes los de producto no entienden nada de código.',
          'Haremos horas extras todos los fines de semana.'
        ],
        correctIndex: 1,
        explanation: 'Proposing phased deliveries ("escalonar la entrega en dos fases") is the quintessential professional engineering response.'
      }
    ],
    6: [
      {
        id: 'es-s6-q1',
        question: 'At the C2 mastery level, how do you express: "The paradigm shift towards event-driven microservices has decoupled our domain boundaries"?',
        options: [
          'El cambio de paradigma hacia microservicios dirigidos por eventos ha desacoplado nuestras fronteras de dominio.',
          'Cambiar el sistema a eventos separó los programas viejos.',
          'Los microservicios son nuevos y desacoplan bases de datos.',
          'El software con eventos corre más rápido en el servidor.'
        ],
        correctIndex: 0,
        explanation: 'Demonstrates native-level technical fluency and precise computer science vocabulary.'
      },
      {
        id: 'es-s6-q2',
        question: 'Which Spanish rhetorical device creates persuasive emphasis in a keynote speech?',
        options: [
          'Anáfora ("No solo construimos código, no solo diseñamos sistemas...")',
          'Elipsis excesiva',
          'Uso indiscriminado de anglicismos',
          'Monotonía tonal sin pausas'
        ],
        correctIndex: 0,
        explanation: 'Anaphora and structured rhetorical framing elevate technical presentations to international conference keynote quality.'
      },
      {
        id: 'es-s6-q3',
        question: 'What does "idempotencia" signify in distributed HTTP and messaging architectures?',
        options: [
          'That operations can be applied multiple times without changing the outcome beyond the initial call',
          'That requests execute faster on multi-core processors',
          'That passwords are encrypted with SHA-256',
          'That endpoints return XML rather than JSON'
        ],
        correctIndex: 0,
        explanation: '"Idempotencia" (idempotence) guarantees identical state regardless of retries.'
      },
      {
        id: 'es-s6-q4',
        question: 'In bilingual technical leadership, how do you address cross-cultural feedback nuances?',
        options: [
          'Always use blunt criticism regardless of cultural context',
          'Adapt communication registers between direct and contextual feedback while maintaining psychological safety',
          'Avoid giving any performance reviews to international peers',
          'Translate English idioms literally word-for-word'
        ],
        correctIndex: 1,
        explanation: 'Adapting registers and fostering psychological safety defines top-tier C2 bilingual engineering managers.'
      },
      {
        id: 'es-s6-q5',
        question: 'Translate the engineering governance principle: "Zero-trust architecture enforces continuous verification at every perimeter."',
        options: [
          'La arquitectura de confianza cero impone la verificación continua en cada perímetro.',
          'El sistema no confía en nadie y borra archivos.',
          'La seguridad sin confianza bloquea a los empleados.',
          'Verificamos perímetros una sola vez al año.'
        ],
        correctIndex: 0,
        explanation: 'Accurately captures cybersecurity governance terminology: "arquitectura de confianza cero" and "verificación continua".'
      }
    ]
  },

  // Tamil Track Stage Quizzes
  'lang-tamil': {
    1: [
      {
        id: 'ta-s1-q1',
        question: 'What is the standard word order in Tamil sentences?',
        options: ['Subject - Verb - Object (SVO)', 'Subject - Object - Verb (SOV)', 'Verb - Subject - Object (VSO)', 'Object - Verb - Subject (OVS)'],
        correctIndex: 1,
        explanation: 'Tamil follows SOV (Subject - Object - Verb) word order. For example: நான் (I) நிரல் (code) எழுதுகிறேன் (write).'
      },
      {
        id: 'ta-s1-q2',
        question: 'How do you say "Hello / Greetings" respectfully in Tamil?',
        options: ['வணக்கம் (Vanakkam)', 'நன்றி (Nandri)', 'வரவேற்கிறோம் (Varaverkirom)', 'போய் வருகிறேன் (Poi varugiren)'],
        correctIndex: 0,
        explanation: '"வணக்கம்" (Vanakkam) is the universal respectful greeting used across personal and professional settings in Tamil.'
      },
      {
        id: 'ta-s1-q3',
        question: 'Which pronoun represents the polite / formal "You" used when speaking to colleagues and interviewers?',
        options: ['நீ (Nee)', 'நீங்கள் (Neengal)', 'அவன் (Avan)', 'அவள் (Aval)'],
        correctIndex: 1,
        explanation: '"நீங்கள்" (Neengal) is the respectful second-person pronoun, mandatory in professional engineering collaboration.'
      },
      {
        id: 'ta-s1-q4',
        question: 'How do you say "Software Engineer" in technical Tamil?',
        options: ['மென்பொருள் பொறியாளர் (Menporul Poriyalar)', 'வன்பொருள் ஆய்வாளர்', 'கணினி தட்டச்சர்', 'தரவு எழுத்தர்'],
        correctIndex: 0,
        explanation: '"மென்பொருள் பொறியாளர்" (Menporul Poriyalar) is the official technical Tamil term for Software Engineer.'
      },
      {
        id: 'ta-s1-q5',
        question: 'Which Tamil number represents "100"?',
        options: ['பத்து (10)', 'ஐம்பது (50)', 'நூறு (100)', 'ஆயிரம் (1000)'],
        correctIndex: 2,
        explanation: 'நூறு (Nooru) is 100 in Tamil.'
      }
    ],
    2: [
      {
        id: 'ta-s2-q1',
        question: 'In a morning standup, how do you say "Yesterday I completed the backend API ticket"?',
        options: [
          'நேற்று நான் பின்தள API பணியை முடித்தேன் (Netru naan pinthala API paniyai mudithen).',
          'நாளை நான் பணியை தொடங்குவேன்.',
          'இன்று நான் API பார்க்கிறேன்.',
          'பணி இன்னும் முடியவில்லை.'
        ],
        correctIndex: 0,
        explanation: '"நேற்று... முடித்தேன்" uses the past tense first-person singular suffix "-ஏன்" indicating completed work.'
      },
      {
        id: 'ta-s2-q2',
        question: 'What is the case suffix for the locational preposition "in/at" (e.g., "in the server") in Tamil?',
        options: ['-ஐ (-ai)', '-இல் (-il)', '-க்கு (-kku)', '-ஆல் (-aal)'],
        correctIndex: 1,
        explanation: 'The seventh case suffix "-இல்" represents "in/at" (e.g. சர்வரில் / கணினியில்).'
      },
      {
        id: 'ta-s2-q3',
        question: 'How do you say "Database" in Tamil?',
        options: ['தரவுத்தளம் (Tharavuththekkam / Tharavuththelem)', 'இணையதளம்', 'செயலி', 'நிரலாக்கம்'],
        correctIndex: 0,
        explanation: '"தரவுத்தளம்" (Tharavuththelem: தரவு = Data + தளம் = Base/Platform) is database.'
      },
      {
        id: 'ta-s2-q4',
        question: 'How do you ask for code review politely in Tamil?',
        options: [
          'தயவுசெய்து எனது நிரலை ஆய்வு செய்யுங்கள் (Thayavuseithu enathu niralai aaivu seiyungal).',
          'நிரலை உடனே அழித்துவிடு.',
          'எனக்கு நிரல் எழுத தெரியாது.',
          'இந்த குறியீடு வேலை செய்யவில்லை.'
        ],
        correctIndex: 0,
        explanation: '"தயவுசெய்து எனது நிரலை ஆய்வு செய்யுங்கள்" is polite, professional, and grammatically precise.'
      },
      {
        id: 'ta-s2-q5',
        question: 'How do you express a blocker: "I am waiting for server credentials"?',
        options: [
          'நான் சர்வர் அனுமதி சான்றுகளுக்காக காத்திருக்கிறேன் (Naan server anumathi saandrugalukkaaga kaathirukkiṟēn).',
          'சர்வர் வேலை செய்கிறது.',
          'நான் புதிய சர்வர் வாங்கினேன்.',
          'அனுமதி தேவையில்லை.'
        ],
        correctIndex: 0,
        explanation: 'Expresses task blockage with the dative-purposive suffix "-க்காக" (waiting for credentials).'
      }
    ],
    3: [
      {
        id: 'ta-s3-q1',
        question: 'How is "Algorithm" translated in classical and modern computer science Tamil?',
        options: ['படிமுறை / நெறிமுறை (Nerimurai / Padimurai)', 'மொழிபெயர்ப்பு', 'கோப்பு', 'வலைப்பின்னல்'],
        correctIndex: 0,
        explanation: '"நெறிமுறை" (Nerimurai) or "படிமுறை" (Padimurai) is the widely accepted Tamil term for Algorithm.'
      },
      {
        id: 'ta-s3-q2',
        question: 'How do you explain: "This algorithm has logarithmic time complexity O(log n)"?',
        options: [
          'இந்த நெறிமுறை மடக்கை நேர சிக்கலான O(log n) தன்மையைக் கொண்டுள்ளது.',
          'இந்த நிரல் மிக மெதுவாக இயங்கும்.',
          'இதன் நினைவகம் எல்லையற்றது.',
          'இதில் சுழற்சி பிழை உள்ளது.'
        ],
        correctIndex: 0,
        explanation: '"மடக்கை நேரம்" is logarithmic time (மடக்கை = logarithm), matching university-level Tamil computing curriculum.'
      },
      {
        id: 'ta-s3-q3',
        question: 'In an incident postmortem, what is "Root cause analysis"?',
        options: ['மூலக் காரண பகுப்பாய்வு (Moola kaarana paguppaaivu)', 'தவறான அறிக்கை', 'வேகமான திருத்தம்', 'இறுதி சோதனை'],
        correctIndex: 0,
        explanation: '"மூலக் காரண பகுப்பாய்வு" is the precise terminology for Root Cause Analysis (RCA).'
      },
      {
        id: 'ta-s3-q4',
        question: 'What is the Tamil term for "Operating System"?',
        options: ['இயக்க முறைமை (Iyakka Muraimai)', 'செயலி முறை', 'நிரல் சட்டம்', 'வன்பொருள் தொகுதி'],
        correctIndex: 0,
        explanation: '"இயக்க முறைமை" (Iyakka Muraimai) is the standardized Tamil term for Operating System (OS).'
      },
      {
        id: 'ta-s3-q5',
        question: 'How do you say "Unit Testing and Integration Testing" in Tamil?',
        options: [
          'அலகு சோதனை மற்றும் ஒருங்கிணைப்பு சோதனை (Alagu sodhanai matrum orunginaipu sodhanai)',
          'முழுமையான திருத்தம்',
          'நேரடி செயலாக்கம்',
          'பயனர் சோதனை மட்டும்'
        ],
        correctIndex: 0,
        explanation: 'Unit test = அலகு சோதனை, Integration test = ஒருங்கிணைப்பு சோதனை.'
      }
    ],
    4: [
      {
        id: 'ta-s4-q1',
        question: 'What is "Cloud Computing" in Tamil?',
        options: ['மேகக்கணிமை (Megakkanimai)', 'மின்னணு கணிமை', 'கம்பி இல்லா வலை', 'வானிலை கணிப்பு'],
        correctIndex: 0,
        explanation: '"மேகக்கணிமை" (Megakkanimai) is the accepted technical translation for Cloud Computing.'
      },
      {
        id: 'ta-s4-q2',
        question: 'How do you say "Microservices Architecture" in Tamil?',
        options: [
          'நுண் சேவை கட்டமைப்பு (Nun-sevai Kattamaippu)',
          'ஒற்றைக் கல் கட்டமைப்பு',
          'பெரிய சேவை தொகுதி',
          'மைய சேவையகம்'
        ],
        correctIndex: 0,
        explanation: '"நுண் சேவை கட்டமைப்பு" (நுண் = Micro, சேவை = Service, கட்டமைப்பு = Architecture).'
      },
      {
        id: 'ta-s4-q3',
        question: 'In distributed systems, how is "High Availability" translated?',
        options: [
          'உயர் கிடைக்கும் தன்மை (Uyar kidaikkum thanmai)',
          'குறைந்த செயல்திறன்',
          'வேகமான நினைவகம்',
          'நீண்ட நேர பிழை'
        ],
        correctIndex: 0,
        explanation: '"உயர் கிடைக்கும் தன்மை" precisely renders High Availability (HA).'
      },
      {
        id: 'ta-s4-q4',
        question: 'Translate: "The load balancer distributes traffic across multiple instances."',
        options: [
          'சுமை சமன்செய்கி பல நிகழ்வுகளுக்கு போக்குவரத்தை பகிர்ந்தளிக்கிறது.',
          'சர்வர் அனைத்து பணிகளையும் நிறுத்துகிறது.',
          'நினைவகம் முழுவதும் நிரம்பிவிட்டது.',
          'வலைப்பின்னல் துண்டிக்கப்பட்டது.'
        ],
        correctIndex: 0,
        explanation: 'சுமை சமன்செய்கி = Load balancer, போக்குவரத்து = Traffic, நிகழ்வுகள் = Instances.'
      },
      {
        id: 'ta-s4-q5',
        question: 'During a live production outage, how do you announce: "We are initiating failover to the secondary region"?',
        options: [
          'இரண்டாம் நிலை மண்டலத்திற்கு தோல்வி மீட்பு மாற்றத்தை தொடங்குகிறோம்.',
          'சர்வரை மூடிவிட்டு நாளை பார்க்கலாம்.',
          'அனைத்து தரவுகளும் அழிந்துவிட்டன.',
          'பயனர்களுக்கு தகவல் தெரிவிக்க வேண்டாம்.'
        ],
        correctIndex: 0,
        explanation: 'Clear, authoritative technical command: இரண்டாம் நிலை மண்டலம் (secondary region), தோல்வி மீட்பு மாற்றம் (failover).'
      }
    ],
    5: [
      {
        id: 'ta-s5-q1',
        question: 'In an executive client presentation, how do you explain Return on Investment (ROI) in tech modernization?',
        options: [
          'கட்டமைப்பு நவீனமயமாக்கலின் மூலம் முதலீட்டின் மீதான வருவாய் (ROI) 35% உயரும்.',
          'நாம் புதிய தொழில்நுட்பத்தை சும்மா முயற்சி செய்கிறோம்.',
          'செலவுகள் அதிகமாகும் ஆனால் பயன் தெரியாது.',
          'பழைய மென்பொருளே போதுமானது.'
        ],
        correctIndex: 0,
        explanation: 'முதலீட்டின் மீதான வருவாய் = Return on Investment (ROI), கட்டமைப்பு நவீனமயமாக்கல் = Architecture Modernization.'
      },
      {
        id: 'ta-s5-q2',
        question: 'How do you negotiate an SLA (சேவை நிலை ஒப்பந்தம்) of 99.9% uptime?',
        options: [
          'நாங்கள் 99.9% இயக்க நேரத்திற்கு சேவை நிலை ஒப்பந்தத்தில் (SLA) உறுதியளிக்கிறோம்.',
          'எங்களால் எந்த உத்தரவாதமும் அளிக்க முடியாது.',
          'சர்வர் எப்போது வேண்டுமானாலும் முடங்கலாம்.',
          'ஒப்பந்தம் தேவையில்லை.'
        ],
        correctIndex: 0,
        explanation: 'Professional contractual language: சேவை நிலை ஒப்பந்தம் (SLA), இயக்க நேரம் (uptime).'
      },
      {
        id: 'ta-s5-q3',
        question: 'What is the Tamil term for "Artificial Intelligence and Machine Learning"?',
        options: [
          'செயற்கை நுண்ணறிவு மற்றும் இயந்திரக் கற்றல் (Seyarkai Nunnarivu matrum Yanthira Katral)',
          'கணினி ஆட்டோமேஷன்',
          'ரோபோடிக்ஸ் மட்டுமே',
          'மனித நுண்ணறிவு'
        ],
        correctIndex: 0,
        explanation: 'செயற்கை நுண்ணறிவு = AI, இயந்திரக் கற்றல் = Machine Learning.'
      },
      {
        id: 'ta-s5-q4',
        question: 'How do you explain technical debt to business stakeholders?',
        options: [
          'தொழில்நுட்ப கடன் என்பது விரைவான தீர்வுகளால் உருவாகும் நீண்டகால பராமரிப்பு செலவாகும்.',
          'இது வங்கியில் வாங்கிய பணக்கடன்.',
          'பொறியாளர்கள் செய்த தேவையற்ற வேலை.',
          'இதனை சரிசெய்யவே முடியாது.'
        ],
        correctIndex: 0,
        explanation: 'Accurately distinguishes technical debt from financial debt with clarity.'
      },
      {
        id: 'ta-s5-q5',
        question: 'How do you lead a cross-functional sprint planning meeting diplomatically in Tamil?',
        options: [
          'அனைத்து குழுக்களின் கருத்துக்களையும் பரிசீலித்து, நமது காலாண்டு இலக்குகளுக்கு முன்னுரிமை அளிப்போம்.',
          'நான் சொல்வதை மட்டும் அனைவரும் கேட்க வேண்டும்.',
          'திட்டமிடுதல் நேர விரயம், நேராக நிரல் எழுதுங்கள்.',
          'தேர்வுகள் பற்றி யாரும் பேசக்கூடாது.'
        ],
        correctIndex: 0,
        explanation: 'Demonstrates collaborative, inspiring executive engineering leadership.'
      }
    ],
    6: [
      {
        id: 'ta-s6-q1',
        question: 'At the C2 bilingual mastery level, how do you define "Zero-Trust Architecture"?',
        options: [
          'பூஜ்ஜிய நம்பிக்கை கட்டமைப்பு எந்தவொரு பயனரையும் முன்கூட்டியே நம்பாமல், ஒவ்வொரு கோரிக்கையையும் தொடர்ச்சியாக சரிபார்க்கிறது.',
          'யாருக்கும் கடவுச்சொல் கொடுக்காமல் இருப்பது.',
          'சர்வரை இணையத்திலிருந்து முழுமையாக துண்டிப்பது.',
          'பாதுகாப்பு இல்லாத ஒரு கட்டமைப்பு.'
        ],
        correctIndex: 0,
        explanation: 'Flawlessly articulates Zero-Trust architectural doctrine in pure Tamil.'
      },
      {
        id: 'ta-s6-q2',
        question: 'Translate: "Event-driven reactive streams facilitate asynchronous non-blocking I/O operations."',
        options: [
          'நிகழ்வு சார்ந்த எதிர்வினை ஓடைகள் ஒத்திசைவற்ற, தடுக்காத உள்ளீடு/வெளியீடு செயல்பாடுகளை எளிதாக்குகின்றன.',
          'சர்வரில் நிகழ்வுகள் தொடர்ந்து நடக்கின்றன.',
          'மெமரி வேகமாக வேலை செய்கிறது.',
          'நிரல்கள் ஒவ்வொன்றாக காத்திருந்து இயங்கும்.'
        ],
        correctIndex: 0,
        explanation: 'Precise computer science vocabulary: நிகழ்வு சார்ந்த (event-driven), எதிர்வினை ஓடைகள் (reactive streams), தடுக்காத I/O (non-blocking I/O).'
      },
      {
        id: 'ta-s6-q3',
        question: 'What is the role of a Principal Engineer in Tamil open-source initiatives?',
        options: [
          'தமிழ் மொழியில் உயர்தர மென்பொருள் ஆவணங்கள், திறந்த மூல கருவிகள் மற்றும் உலகளாவிய சமூக பட்டறைகளை வழிநடத்துதல்.',
          'தனிப்பட்ட வணிகத்திற்காக மட்டும் குறியீட்டை மறைத்து வைத்தல்.',
          'மற்றவர்களின் பங்களிப்பை நிராகரித்தல்.',
          'மொழிபெயர்ப்புகளை மட்டுமே செய்தல்.'
        ],
        correctIndex: 0,
        explanation: 'Highlights open-source authorship, mentorship, and community leadership.'
      },
      {
        id: 'ta-s6-q4',
        question: 'How is "CAP Theorem" explained in bilingual engineering symposiums?',
        options: [
          'நிலைத்தன்மை (Consistency), கிடைக்கும் தன்மை (Availability), மற்றும் பகிர்வு சகிப்புத்தன்மை (Partition tolerance) ஆகிய மூன்றில் இரண்டை மட்டுமே ஒரு விநியோகிக்கப்பட்ட அமைப்பால் ஒரே நேரத்தில் முழுமையாக உறுதிப்படுத்த முடியும்.',
          'மூன்றையும் எப்போதும் 100% அடைய முடியும்.',
          'இது கணினியின் வேகம் பற்றிய விதி.',
          'இது இணையதள வடிவமைப்பிற்கான கோட்பாடு.'
        ],
        correctIndex: 0,
        explanation: 'Correct, masterful bilingual articulation of Brewer\'s CAP theorem in distributed computing.'
      },
      {
        id: 'ta-s6-q5',
        question: 'What does "Bilingual Technical Fluency" empower you to do in multinational engineering hubs?',
        options: [
          'Converse, author architectural RFCs, review pull requests, and lead multinational teams seamlessly in both native Tamil and global English.',
          'Speak only in Tamil and refuse English emails.',
          'Memorize syntax without understanding system design.',
          'Rely exclusively on automated translation tools.'
        ],
        correctIndex: 0,
        explanation: 'Bilingual technical fluency bridges deep cultural intuition with Tier-1 global engineering leadership.'
      }
    ]
  },

  // German Track Stage Quizzes
  'lang-german': {
    1: [
      {
        id: 'de-s1-q1',
        question: 'How do you say "Hello, nice to meet you" formally in German?',
        options: ['Guten Tag, sehr erfreut.', 'Tschüss, bis morgen.', 'Hallo, wer bist du?', 'Gute Nacht, danke schön.'],
        correctIndex: 0,
        explanation: '"Guten Tag, sehr erfreut" is the proper formal greeting for professional introductions in German.'
      },
      {
        id: 'de-s1-q2',
        question: 'Which definite article is used with the masculine noun "der Server"?',
        options: ['Die', 'Der', 'Das', 'Den'],
        correctIndex: 1,
        explanation: '"Server" is masculine in German: "der Server".'
      },
      {
        id: 'de-s1-q3',
        question: 'How do you state your role: "I work as a software developer"?',
        options: [
          'Ich arbeite als Softwareentwickler.',
          'Ich bin arbeite von Computer.',
          'Ich mache Softwareentwicklung heute.',
          'Mein Beruf ist nicht Entwickler.'
        ],
        correctIndex: 0,
        explanation: '"Ich arbeite als [Beruf]" or "Ich bin Softwareentwickler" is the standard German phrasing.'
      },
      {
        id: 'de-s1-q4',
        question: 'In German numbers, how is 45 pronounced?',
        options: ['Fünfundvierzig (five-and-forty)', 'Vierzigfünf', 'Fünfzigvier', 'Vierundfünfzig'],
        correctIndex: 0,
        explanation: 'German numbers state the unit first, then the ten: "fünfundvierzig" (5 and 40).'
      },
      {
        id: 'de-s1-q5',
        question: 'Which pronoun is the formal "You" (always capitalized)?',
        options: ['du', 'ihr', 'Sie', 'wir'],
        correctIndex: 2,
        explanation: '"Sie" (capitalized) is the formal "You", used in business and engineering workplaces.'
      }
    ],
    2: [
      {
        id: 'de-s2-q1',
        question: 'In a Daily Scrum, how do you say: "Yesterday I resolved the database migration issue"?',
        options: [
          'Gestern habe ich das Problem mit der Datenbankmigration gelöst.',
          'Morgen löse ich alle Datenbanken.',
          'Gestern ich löste keine Probleme.',
          'Datenbank ist gelöst heute morgen.'
        ],
        correctIndex: 0,
        explanation: 'Uses the Perfekt tense with the verb at the end: "habe ich ... gelöst", typical of spoken German.'
      },
      {
        id: 'de-s2-q2',
        question: 'What is the German word for "blocker" or "impediment"?',
        options: ['Das Hindernis / Der Blocker', 'Die Pause', 'Der Erfolg', 'Die Aufgabe'],
        correctIndex: 0,
        explanation: '"Das Hindernis" or "Der Blocker" represents an impediment in agile workflows.'
      },
      {
        id: 'de-s2-q3',
        question: 'How do you ask: "Could you please review my pull request?"',
        options: [
          'Könntest du bitte meinen Pull Request überprüfen?',
          'Musst du meinen Code löschen?',
          'Willst du keine Reviews machen?',
          'Schau dir den Computer an sofort.'
        ],
        correctIndex: 0,
        explanation: '"Könntest du bitte... überprüfen?" uses Konjunktiv II for polite requests.'
      },
      {
        id: 'de-s2-q4',
        question: 'What is "Deployment in die Produktionsumgebung"?',
        options: ['Production deployment', 'Local sandbox testing', 'Git commit history', 'Database backup'],
        correctIndex: 0,
        explanation: '"Produktionsumgebung" = Production environment.'
      },
      {
        id: 'de-s2-q5',
        question: 'Which preposition takes the dative case to indicate working "at/with" a company (e.g. "at SAP")?',
        options: ['Bei (Ich arbeite bei...)', 'Für', 'In', 'Zu'],
        correctIndex: 0,
        explanation: '"Bei" + Dative is standard for corporate employment: "Ich arbeite bei einem Tech-Unternehmen".'
      }
    ],
    3: [
      {
        id: 'de-s3-q1',
        question: 'What is a memory leak called in German engineering documentation?',
        options: ['Das Speicherleck', 'Der Datenverlust', 'Die Festplattenpause', 'Der CPU-Fehler'],
        correctIndex: 0,
        explanation: '"Das Speicherleck" is the technical German term for memory leak.'
      },
      {
        id: 'de-s3-q2',
        question: 'How do you say "Root cause analysis" in German?',
        options: ['Ursachenanalyse (Root Cause Analysis)', 'Fehlersuche ohne Plan', 'Schnellbericht', 'Schuldzuweisung'],
        correctIndex: 0,
        explanation: '"Die Ursachenanalyse" is root cause analysis in German engineering QA.'
      },
      {
        id: 'de-s3-q3',
        question: 'Translate: "If we refactor this module, the test coverage will increase."',
        options: [
          'Wenn wir dieses Modul refaktorisieren, wird die Testabdeckung steigen.',
          'Falls wir Module löschen, gibt es keine Tests.',
          'Wenn das Modul kaputt ist, testen wir nicht.',
          'Obwohl wir testen, bleibt alles gleich.'
        ],
        correctIndex: 0,
        explanation: 'Subordinate clause with "Wenn" puts the conjugated verb at the end ("refaktorisieren"), followed by "wird die Testabdeckung steigen".'
      },
      {
        id: 'de-s3-q4',
        question: 'What is "Die Entkopplung von Komponenten"?',
        options: ['Decoupling of components for modularity', 'Merging duplicate files', 'Deleting network cables', 'Power supply reset'],
        correctIndex: 0,
        explanation: '"Entkopplung" means decoupling in software architecture.'
      },
      {
        id: 'de-s3-q5',
        question: 'How do you formulate diplomatic code review feedback?',
        options: [
          'Ich schlage vor, diese Funktion aufzuteilen, um die Lesbarkeit zu verbessern.',
          'Dieser Code ist furchtbar geschrieben.',
          'Lösche diese Datei sofort.',
          'Niemand versteht diese Zeile.'
        ],
        correctIndex: 0,
        explanation: '"Ich schlage vor, ... aufzuteilen, um ... zu verbessern" is respectful, constructive engineering etiquette.'
      }
    ],
    4: [
      {
        id: 'de-s4-q1',
        question: 'What does "Hochverfügbarkeit" mean in system architecture?',
        options: ['High Availability', 'High Bandwidth', 'High Memory Cost', 'High Priority Ticket'],
        correctIndex: 0,
        explanation: '"Hochverfügbarkeit" is the exact translation of High Availability (HA).'
      },
      {
        id: 'de-s4-q2',
        question: 'How do you translate "Fault tolerance" in German?',
        options: ['Fehlertoleranz', 'Fehlerausschluss', 'Schnellstart', 'Systemprüfung'],
        correctIndex: 0,
        explanation: '"Die Fehlertoleranz" describes resilient systems capable of handling component failures.'
      },
      {
        id: 'de-s4-q3',
        question: 'In a Sev-1 outage, how does the incident commander order a rollback?',
        options: [
          'Wir führen unverzüglich ein Rollback auf die vorherige Version durch.',
          'Wir warten bis nächste Woche.',
          'Schalten Sie alle Server ab.',
          'Wir löschen die Benutzerdatenbank.'
        ],
        correctIndex: 0,
        explanation: 'Decisive engineering directive: "unverzüglich ein Rollback durchführen".'
      },
      {
        id: 'de-s4-q4',
        question: 'What is "Der Lastausgleich" in network engineering?',
        options: ['Load balancing', 'Memory clearing', 'Power outage', 'Disk defragmentation'],
        correctIndex: 0,
        explanation: '"Lastausgleich" or "Load Balancer" balances network traffic across servers.'
      },
      {
        id: 'de-s4-q5',
        question: 'Translate: "Microservices enable independent deployment cycles and fault isolation."',
        options: [
          'Microservices ermöglichen unabhängige Bereitstellungszyklen und Fehlerisolation.',
          'Microservices sind zu komplex für kleine Teams.',
          'Monolithen sind immer besser als Microservices.',
          'Deployments dauern jetzt doppelt so lange.'
        ],
        correctIndex: 0,
        explanation: 'Accurate German architectural translation: Bereitstellungszyklen = deployment cycles, Fehlerisolation = fault isolation.'
      }
    ],
    5: [
      {
        id: 'de-s5-q1',
        question: 'How do you negotiate a Service Level Agreement in German?',
        options: [
          'Wir garantieren eine Verfügbarkeit von 99,99% gemäß der Service-Level-Vereinbarung.',
          'Wir machen keine Versprechen über Serverzeiten.',
          'Der Vertrag wird morgen gekündigt.',
          'Ausfallzeiten sind dem Kunden egal.'
        ],
        correctIndex: 0,
        explanation: '"Service-Level-Vereinbarung" (SLA) with guaranteed availability.'
      },
      {
        id: 'de-s5-q2',
        question: 'What is "Technische Schulden" in software engineering?',
        options: ['Technical debt', 'Financial overdraft', 'Unpaid vendor invoices', 'Hardware maintenance fee'],
        correctIndex: 0,
        explanation: '"Technische Schulden" refers to technical debt from sub-optimal architecture.'
      },
      {
        id: 'de-s5-q3',
        question: 'How do you defend choosing eventual consistency in a system design interview?',
        options: [
          'Wir haben uns für Eventual Consistency entschieden, um die Latenz zu minimieren und Hochverfügbarkeit nach dem CAP-Theorem zu gewährleisten.',
          'Strikte Konsistenz ist immer unnötig.',
          'Die Datenbank kann keine Transaktionen speichern.',
          'Weil es der Industriestandard ist ohne Grund.'
        ],
        correctIndex: 0,
        explanation: 'Addresses trade-offs and CAP theorem with German technical precision.'
      },
      {
        id: 'de-s5-q4',
        question: 'How do you push back diplomatically on an aggressive milestone deadline?',
        options: [
          'Um die architektonische Integrität und Testabdeckung zu wahren, empfehle ich eine gestaffelte Bereitstellung.',
          'Das schaffen wir nie im Leben.',
          'Produktmanagement versteht die Technik nicht.',
          'Wir streichen einfach alle Tests.'
        ],
        correctIndex: 0,
        explanation: '"Eine gestaffelte Bereitstellung" (phased release) protects architecture integrity.'
      },
      {
        id: 'de-s5-q5',
        question: 'What is "Skalierbarkeit und Durchsatz"?',
        options: ['Scalability and Throughput', 'Security and Backup', 'Screen resolution and FPS', 'Pricing and discount'],
        correctIndex: 0,
        explanation: 'Skalierbarkeit = Scalability, Durchsatz = Throughput.'
      }
    ],
    6: [
      {
        id: 'de-s6-q1',
        question: 'How do you define "Zero-Trust-Architektur" at the C2 executive level?',
        options: [
          'Eine Zero-Trust-Architektur basiert auf dem Grundsatz kontinuierlicher Verifizierung und minimaler Rechtevergabe ohne implizites Vertrauen.',
          'Niemand im Team darf miteinander sprechen.',
          'Alle Passwörter werden täglich gelöscht.',
          'Server haben keine Internetverbindung.'
        ],
        correctIndex: 0,
        explanation: 'Captures the core security principle: "kontinuierliche Verifizierung und minimale Rechtevergabe".'
      },
      {
        id: 'de-s6-q2',
        question: 'Translate: "The distributed consensus algorithm guarantees data replication even under network partitions."',
        options: [
          'Der verteilte Konsensalgorithmus garantiert die Datenreplikation selbst bei Netzwerkpartitionen.',
          'Netzwerke stürzen bei Partitionen immer ab.',
          'Algorithmen funktionieren nur auf einem einzelnen Rechner.',
          'Replikation ist bei Ausfällen unmöglich.'
        ],
        correctIndex: 0,
        explanation: 'High-level C2 technical phrasing: "verteilter Konsensalgorithmus", "Netzwerkpartitionen".'
      },
      {
        id: 'de-s6-q3',
        question: 'What does "Idempotenz" ensure in event processing systems?',
        options: [
          'Dass mehrfache Ausführungen denselben Systemzustand wie eine einmalige Ausführung bewirken',
          'Dass Nachrichten schneller versendet werden',
          'Dass keine Log-Dateien geschrieben werden',
          'Dass HTTP 500 Fehler ignoriert werden'
        ],
        correctIndex: 0,
        explanation: 'Precise computer science definition of idempotency in German.'
      },
      {
        id: 'de-s6-q4',
        question: 'In bilingual technical leadership, how do German engineering principles emphasize craftsmanship?',
        options: [
          'Through rigorous modular design, comprehensive type safety, and exhaustive unit and integration testing ("Ingenieurskunst")',
          'By skipping unit tests to ship faster',
          'By ignoring international coding standards',
          'By hardcoding credentials into source files'
        ],
        correctIndex: 0,
        explanation: 'Reflects the renowned German engineering discipline ("Ingenieurskunst").'
      },
      {
        id: 'de-s6-q5',
        question: 'Translate: "Event-driven reactive streams facilitate asynchronous non-blocking I/O operations."',
        options: [
          'Ereignisgesteuerte reaktive Streams ermöglichen asynchrone, nicht-blockierende E/A-Operationen.',
          'Serverprogramme stoppen bei jedem Ereignis.',
          'Reaktive Programmierung ist veraltet.',
          'Blockierende Aufrufe sind immer vorzuziehen.'
        ],
        correctIndex: 0,
        explanation: 'Masterful native technical terminology: ereignisgesteuert = event-driven, nicht-blockierend = non-blocking.'
      }
    ]
  },

  // French Track Stage Quizzes
  'lang-french': {
    1: [
      {
        id: 'fr-s1-q1',
        question: 'How do you say "Hello, pleased to meet you" formally in French?',
        options: ['Bonjour, enchanté de faire votre connaissance.', 'Salut, ça va mal.', 'Au revoir, bonne nuit.', 'Bonjour, où vas-tu?'],
        correctIndex: 0,
        explanation: '"Bonjour, enchanté de faire votre connaissance" is the polite formal French greeting.'
      },
      {
        id: 'fr-s1-q2',
        question: 'Which French verb corresponds to "to be" (used for identity and profession: "Je suis ingénieur")?',
        options: ['Avoir', 'Être', 'Faire', 'Aller'],
        correctIndex: 1,
        explanation: '"Être" (Je suis, tu es, il est...) is "to be".'
      },
      {
        id: 'fr-s1-q3',
        question: 'What is the number "80" in French?',
        options: ['Quatre-vingts (four twenties)', 'Huitante', 'Soixante-dix', 'Nonante'],
        correctIndex: 0,
        explanation: 'Standard French counts 80 as "quatre-vingts" (4 × 20).'
      },
      {
        id: 'fr-s1-q4',
        question: 'What is the gender of the noun "la base de données"?',
        options: ['Féminin (la)', 'Masculin (le)', 'Neutre', 'Pluriel seulement'],
        correctIndex: 0,
        explanation: '"La base de données" is feminine.'
      },
      {
        id: 'fr-s1-q5',
        question: 'How do you say "I work as a full-stack developer"?',
        options: [
          'Je travaille comme développeur full-stack.',
          'Je fais développement hier.',
          'Mon travail est pas développeur.',
          'Je vais dans le code.'
        ],
        correctIndex: 0,
        explanation: '"Je travaille comme développeur..." is standard workplace French.'
      }
    ],
    2: [
      {
        id: 'fr-s2-q1',
        question: 'In a morning standup, how do you say: "Yesterday I resolved the authentication ticket"?',
        options: [
          'Hier, j\'ai résolu le ticket d\'authentification.',
          'Demain, je résous le code.',
          'Hier, je résous sans ticket.',
          'Le serveur est résolu aujourd\'hui.'
        ],
        correctIndex: 0,
        explanation: 'Uses passé composé: "j\'ai résolu" for a completed past action.'
      },
      {
        id: 'fr-s2-q2',
        question: 'What is a "bloqueur" in agile engineering in French?',
        options: ['A blocker / impediment preventing progress', 'A keyboard key', 'A firewall rule', 'A project manager'],
        correctIndex: 0,
        explanation: 'Un bloqueur is an impediment or blocker in sprint standups.'
      },
      {
        id: 'fr-s2-q3',
        question: 'How do you ask politely: "Could you review my pull request?"',
        options: [
          'Pourriez-vous examiner ma pull request quand vous aurez un moment ?',
          'Regarde mon code tout de suite.',
          'Efface mon code rapidement.',
          'Ne touche pas à ma branche.'
        ],
        correctIndex: 0,
        explanation: 'Uses polite conditional "Pourriez-vous examiner..." with future anterior "quand vous aurez un moment".'
      },
      {
        id: 'fr-s2-q4',
        question: 'What is "Déploiement en production"?',
        options: ['Production deployment', 'Staging build', 'Code formatting', 'Git rebase'],
        correctIndex: 0,
        explanation: 'Déploiement en production = deployment to live production environment.'
      },
      {
        id: 'fr-s2-q5',
        question: 'How do you express an upcoming deadline: "It will be ready for Friday"?',
        options: [
          'Ce sera prêt pour vendredi.',
          'C\'est fini depuis hier.',
          'Vendredi n\'existe pas.',
          'Le code sera effacé vendredi.'
        ],
        correctIndex: 0,
        explanation: '"Ce sera prêt pour vendredi" expresses the future completion deadline.'
      }
    ],
    3: [
      {
        id: 'fr-s3-q1',
        question: 'What is a memory leak called in French software engineering?',
        options: ['Une fuite de mémoire', 'Une perte de données', 'Un trou de RAM', 'Une coupure réseau'],
        correctIndex: 0,
        explanation: '"Une fuite de mémoire" is standard technical French for memory leak.'
      },
      {
        id: 'fr-s3-q2',
        question: 'Why is the subjunctive used in: "Il faut que nous optimisions cette requête SQL" ?',
        options: [
          'Because "Il faut que..." requires the subjunctive mood ("optimisions").',
          'Because it is an action in the past.',
          'Because it is a future fact.',
          'Because of the word SQL.'
        ],
        correctIndex: 0,
        explanation: 'Expressions of necessity like "Il faut que..." trigger the subjunctive.'
      },
      {
        id: 'fr-s3-q3',
        question: 'What is "Analyse de la cause racine"?',
        options: ['Root Cause Analysis (RCA)', 'Quick bug patch', 'Performance review', 'Sprint demo'],
        correctIndex: 0,
        explanation: '"Analyse de la cause racine" is RCA.'
      },
      {
        id: 'fr-s3-q4',
        question: 'Translate: "If we refactor this service, the latency will decrease significantly."',
        options: [
          'Si nous refactorisons ce service, la latence diminuera significativement.',
          'Quand nous refactorisons, la vitesse baisse.',
          'Si nous avions refactorisé hier.',
          'Le service ne peut pas être refactorisé.'
        ],
        correctIndex: 0,
        explanation: '"Si + présent (refactorisons), futur simple (diminuera)".'
      },
      {
        id: 'fr-s3-q5',
        question: 'How do you formulate diplomatic code review feedback in French?',
        options: [
          'Je suggère de découpler cette méthode pour renforcer la modularité et la testabilité.',
          'Ce code est illisible.',
          'Supprime tout le fichier.',
          'C\'est une très mauvaise idée.'
        ],
        correctIndex: 0,
        explanation: '"Je suggère de découpler cette méthode..." provides constructive technical suggestions.'
      }
    ],
    4: [
      {
        id: 'fr-s4-q1',
        question: 'How do you say "High Availability" in French cloud computing?',
        options: ['Haute disponibilité', 'Grande vitesse', 'Accès illimité', 'Faible coût'],
        correctIndex: 0,
        explanation: '"Haute disponibilité" is High Availability (HA).'
      },
      {
        id: 'fr-s4-q2',
        question: 'What is "Tolérance aux pannes"?',
        options: ['Fault tolerance', 'Zero bugs', 'Network speed', 'Hardware replacement'],
        correctIndex: 0,
        explanation: '"Tolérance aux pannes" means system resilience against faults.'
      },
      {
        id: 'fr-s4-q3',
        question: 'In a Sev-1 incident call, how do you order an immediate rollback?',
        options: [
          'Effectuons un rollback immédiat vers la version précédente.',
          'Attendons demain pour voir.',
          'Éteignez tous les serveurs.',
          'Ne dites rien aux clients.'
        ],
        correctIndex: 0,
        explanation: 'Decisive command: "Effectuons un rollback immédiat...".'
      },
      {
        id: 'fr-s4-q4',
        question: 'What is "Équilibrage de charge"?',
        options: ['Load balancing', 'Disk backup', 'Battery charging', 'Weight calibration'],
        correctIndex: 0,
        explanation: '"Équilibrage de charge" = Load balancing.'
      },
      {
        id: 'fr-s4-q5',
        question: 'Translate: "The distributed caching layer guarantees low latency for read-heavy workloads."',
        options: [
          'La couche de mise en cache distribuée garantit une faible latence pour les charges de travail à forte intensité de lecture.',
          'Le cache local supprime les fichiers.',
          'La mémoire vive est saturée.',
          'Les lectures de données sont trop lentes.'
        ],
        correctIndex: 0,
        explanation: 'Precise cloud architecture translation.'
      }
    ],
    5: [
      {
        id: 'fr-s5-q1',
        question: 'How do you negotiate a Service Level Agreement in French?',
        options: [
          'Nous nous engageons à un taux de disponibilité de 99,95% conformément au contrat de niveau de service (SLA).',
          'Nous ne pouvons rien garantir.',
          'Le serveur marchera peut-être.',
          'Les clients n\'ont pas besoin de SLA.'
        ],
        correctIndex: 0,
        explanation: '"Contrat de niveau de service (SLA)" and "taux de disponibilité".'
      },
      {
        id: 'fr-s5-q2',
        question: 'What is "La dette technique"?',
        options: ['Technical debt', 'Financial debt', 'Server cost', 'Salary payments'],
        correctIndex: 0,
        explanation: '"La dette technique" is technical debt.'
      },
      {
        id: 'fr-s5-q3',
        question: 'How do you defend eventual consistency under the CAP theorem in French?',
        options: [
          'Nous privilégions la cohérence éventuelle afin de maximiser la haute disponibilité et de minimiser la latence selon le théorème CAP.',
          'La cohérence immédiate est toujours facile.',
          'La base de données n\'a pas de transactions.',
          'Parce que le cloud est magique.'
        ],
        correctIndex: 0,
        explanation: 'Demonstrates senior systems design mastery.'
      },
      {
        id: 'fr-s5-q4',
        question: 'How do you diplomatically push back on an unrealistic project deadline?',
        options: [
          'Afin de préserver les standards de qualité et la couverture de tests, je préconise une livraison progressive en deux jalons.',
          'C\'est complètement infaisable.',
          'Vous ne comprenez rien à l\'ingénierie.',
          'Nous allons travailler jour et nuit sans dormir.'
        ],
        correctIndex: 0,
        explanation: 'Recommending phased delivery ("livraison progressive en deux jalons") is leadership etiquette.'
      },
      {
        id: 'fr-s5-q5',
        question: 'What is "Évolutivité horizontale et débit"?',
        options: ['Horizontal scalability and throughput', 'Screen resolution and color', 'Cost reduction and audit', 'User interface polish'],
        correctIndex: 0,
        explanation: 'Évolutivité = scalability, débit = throughput.'
      }
    ],
    6: [
      {
        id: 'fr-s6-q1',
        question: 'How do you define "Architecture Zero-Trust" at the C2 level in French?',
        options: [
          'L\'architecture Zero-Trust repose sur le principe de vérification continue et d\'accès selon le moindre privilège, sans confiance implicite.',
          'Personne dans l\'entreprise n\'a le droit de se connecter.',
          'Les mots de passe sont supprimés.',
          'Les serveurs sont déconnectés.'
        ],
        correctIndex: 0,
        explanation: 'Accurately articulates zero-trust security doctrine in high-register French.'
      },
      {
        id: 'fr-s6-q2',
        question: 'Translate: "Asynchronous event-driven microservices decouple bounded domains."',
        options: [
          'Les microservices asynchrones orientés événements découplent les domaines délimités.',
          'Les services rapides effacent les données.',
          'Le code monolithique est plus moderne.',
          'Les événements bloquent les serveurs.'
        ],
        correctIndex: 0,
        explanation: 'Exact domain-driven design terminology in French.'
      },
      {
        id: 'fr-s6-q3',
        question: 'What is "L\'idempotence" in API architecture?',
        options: [
          'The property where multiple identical requests produce the exact same server state as a single request',
          'Faster network transfer',
          'Automatic database backups',
          'Encrypted SSL certificates'
        ],
        correctIndex: 0,
        explanation: 'Accurate computer science definition of idempotence.'
      },
      {
        id: 'fr-s6-q4',
        question: 'In international technical leadership, what does bilingual fluency enable?',
        options: [
          'Leading distributed teams, authoring technical whitepapers, and negotiating high-value enterprise architectures with global poise',
          'Using automatic translation for all communications',
          'Speaking only one dialect',
          'Avoiding client-facing responsibilities'
        ],
        correctIndex: 0,
        explanation: 'Reflects the full scope of executive polyglot engineering leadership.'
      },
      {
        id: 'fr-s6-q5',
        question: 'Translate: "Continuous integration and delivery pipelines ensure rapid and dependable software shipments."',
        options: [
          'Les pipelines d\'intégration et de déploiement continus garantissent des livraisons logicielles rapides et fiables.',
          'Les tests manuels sont préférables aux pipelines.',
          'Le déploiement logiciel prend des semaines.',
          'Les serveurs arrêtent les pipelines.'
        ],
        correctIndex: 0,
        explanation: 'Standard DevOps translation: intégration et déploiement continus (CI/CD).'
      }
    ]
  },

  // Japanese Track Stage Quizzes
  'lang-japanese': {
    1: [
      {
        id: 'ja-s1-q1',
        question: 'How do you say "Nice to meet you, I look forward to working with you" in Japanese workplace etiquette?',
        options: [
          'はじめまして、よろしくお願いします (Hajimemashite, yoroshiku onegaishimasu).',
          'さようなら、またあした (Sayounara, mata ashita).',
          'こんにちは、元気ですか (Konnichiwa, genki desu ka).',
          'おやすみなさい (Oyasuminasai).'
        ],
        correctIndex: 0,
        explanation: '"はじめまして、よろしくお願いします" is the quintessential Japanese business greeting.'
      },
      {
        id: 'ja-s1-q2',
        question: 'Which particle indicates the topic of the sentence (e.g. "Watashi [?] engineer desu")?',
        options: ['は (wa)', 'を (o)', 'に (ni)', 'で (de)'],
        correctIndex: 0,
        explanation: 'The topic marker is the particle は (pronounced "wa").'
      },
      {
        id: 'ja-s1-q3',
        question: 'How do you say "Software Engineer" in Japanese?',
        options: [
          'ソフトウェアエンジニア (Software Engineer)',
          'パソコンマン (Pasokonman)',
          'デンワシャ (Denwasha)',
          'ジテンシャ (Jitensha)'
        ],
        correctIndex: 0,
        explanation: 'In Japanese tech companies, ソフトウェアエンジニア (or エンジニア / 開発者) is the standard term.'
      },
      {
        id: 'ja-s1-q4',
        question: 'What is the Japanese number 10,000?',
        options: ['一万 (ichiman)', '千 (sen)', '十万 (juuman)', '百 (hyaku)'],
        correctIndex: 0,
        explanation: 'Japanese counts in units of 10,000 (万, man). 10,000 = 一万 (ichiman).'
      },
      {
        id: 'ja-s1-q5',
        question: 'How do you state: "I am a backend developer"?',
        options: [
          '私はバックエンド開発者です (Watashi wa bakkuendo kaihatsusha desu).',
          '私はパソコンを買いました (Watashi wa pasokon o kaimashita).',
          'エンジニアではありません (Engineer dewa arimasen).',
          'コードを消しました (Code o keshimashita).'
        ],
        correctIndex: 0,
        explanation: '"私はバックエンド開発者です" accurately states your engineering role.'
      }
    ],
    2: [
      {
        id: 'ja-s2-q1',
        question: 'In morning Chōrei (朝礼 / Standup), how do you say: "Yesterday I completed the ticket"?',
        options: [
          '昨日はチケットを完了しました (Kinō wa chiketto o kanryō shimashita).',
          '明日はチケットを始めます (Ashita wa chiketto o hajimemasu).',
          'チケットが消えました (Chiketto ga kiemashita).',
          '何もしていません (Nanimo shiteimasen).'
        ],
        correctIndex: 0,
        explanation: '"完了しました" (kanryō shimashita) is the formal polite past tense for completing a task.'
      },
      {
        id: 'ja-s2-q2',
        question: 'How do you ask for a code review respectfully using Keigo?',
        options: [
          'コードレビューをお願いできますでしょうか (Kōdo rebyū o onegai dekimasu deshō ka).',
          'コードを見ろ (Kōdo o miro).',
          'レビューしたくない (Rebyū shitakunai).',
          'コードを消して (Kōdo o keshite).'
        ],
        correctIndex: 0,
        explanation: '"〜をお願いできますでしょうか" is respectful business Keigo requesting assistance.'
      },
      {
        id: 'ja-s2-q3',
        question: 'What is "Blocker / Impediment" in Japanese agile teams?',
        options: ['障害 / ブロッカー (Shōgai / Burokkā)', '休憩 (Kyūkei)', '成功 (Seikō)', '祝日 (Shukujitsu)'],
        correctIndex: 0,
        explanation: 'Impediments are termed 障害 (obstacle/issue) or ブロッカー.'
      },
      {
        id: 'ja-s2-q4',
        question: 'What does "Honban Kankyō" (本番環境) mean?',
        options: ['Production environment', 'Test environment', 'Local machine', 'Development branch'],
        correctIndex: 0,
        explanation: '本番環境 (honban kankyō) means production environment.'
      },
      {
        id: 'ja-s2-q5',
        question: 'How do you say "Thank you for your hard work" to teammates at the end of the day?',
        options: [
          'お疲れ様でした (Otsukaresama deshita).',
          'おはようございます (Ohayō gozaimasu).',
          'ごめんなさい (Gomennasai).',
          'いただきます (Itadakimasu).'
        ],
        correctIndex: 0,
        explanation: '"お疲れ様でした" is the universal Japanese workplace acknowledgment of teamwork.'
      }
    ],
    3: [
      {
        id: 'ja-s3-q1',
        question: 'What is a memory leak called in Japanese technical documentation?',
        options: ['メモリリーク (Memori riiku)', 'データ消失 (Deeta shōshitsu)', 'ディスク破損 (Disuku hason)', 'ネットワーク切断 (Netto saikiri)'],
        correctIndex: 0,
        explanation: 'メモリリーク is the katakana tech term for memory leak.'
      },
      {
        id: 'ja-s3-q2',
        question: 'What is "Gen\'in bunseki" (原因分析)?',
        options: ['Root cause analysis (RCA)', 'Speed test', 'New feature design', 'Budget calculation'],
        correctIndex: 0,
        explanation: '原因分析 (gen\'in bunseki) = Root Cause Analysis.'
      },
      {
        id: 'ja-s3-q3',
        question: 'Translate: "If we optimize this database index, search performance will improve."',
        options: [
          'このデータベースのインデックスを最適化すれば、検索性能が向上します。',
          'インデックスを消せば早くなります。',
          '検索はいつも遅いです。',
          'データベースを再起動してください。'
        ],
        correctIndex: 0,
        explanation: 'Uses conditional 〜ば (saitekika sureba) followed by 向上します (will improve).'
      },
      {
        id: 'ja-s3-q4',
        question: 'How do you politely suggest an architecture improvement in a PR comment?',
        options: [
          '保守性を高めるために、このクラスを分離することをご提案します。',
          'このコードはダメです。',
          '書き直してください。',
          '分かりにくいです。'
        ],
        correctIndex: 0,
        explanation: '"〜をご提案します" (I propose...) is respectful and collaborative Keigo.'
      },
      {
        id: 'ja-s3-q5',
        question: 'What is "Tango Shiken" (単体テスト) and "Ketsugō Shiken" (結合テスト)?',
        options: ['Unit Test and Integration Test', 'Screen design and Wireframe', 'Manual audit and Release', 'Frontend and Backend'],
        correctIndex: 0,
        explanation: '単体テスト = Unit test, 結合テスト = Integration test.'
      }
    ],
    4: [
      {
        id: 'ja-s4-q1',
        question: 'What is "Kō-kayōsei" (高可用性) in cloud infrastructure?',
        options: ['High Availability (HA)', 'High Latency', 'Low Cost', 'High Storage Capacity'],
        correctIndex: 0,
        explanation: '高可用性 (kō-kayōsei) is High Availability.'
      },
      {
        id: 'ja-s4-q2',
        question: 'What is "Shōgai Taisei" (障害耐性)?',
        options: ['Fault tolerance', 'Zero bugs', 'Fast booting', 'Anti-virus scanner'],
        correctIndex: 0,
        explanation: '障害耐性 (shōgai taisei) = Fault tolerance.'
      },
      {
        id: 'ja-s4-q3',
        question: 'During a Sev-1 outage, how do you announce: "We are rolling back to the previous version immediately"?',
        options: [
          '直ちに前のバージョンへロールバックを実施します。',
          '明日まで様子を見ましょう。',
          'サーバーの電源を切ります。',
          'ユーザーに内緒にしましょう。'
        ],
        correctIndex: 0,
        explanation: 'Authoritative, decisive directive: 直ちに (immediately) ロールバックを実施します.'
      },
      {
        id: 'ja-s4-q4',
        question: 'What is "Fuka Bunsan" (負荷分散)?',
        options: ['Load balancing', 'Disk formatting', 'Memory overflow', 'Cable management'],
        correctIndex: 0,
        explanation: '負荷分散 (fuka bunsan) = Load balancing.'
      },
      {
        id: 'ja-s4-q5',
        question: 'Translate: "Microservices architecture decouples services and enables independent deployments."',
        options: [
          'マイクロサービスアーキテクチャはサービスを疎結合にし、独立したデプロイを可能にします。',
          'モノリスの方が常に優れています。',
          'マイクロサービスは開発を遅くします。',
          'すべてのサーバーが止まりました。'
        ],
        correctIndex: 0,
        explanation: '疎結合 (loose coupling / decoupled) and 独立したデプロイ (independent deploy).'
      }
    ],
    5: [
      {
        id: 'ja-s5-q1',
        question: 'How do you negotiate an SLA (サービスレベル合意書) with enterprise clients in Japanese?',
        options: [
          'SLAに基づき、99.95%の稼働率を保証いたします。',
          'サーバーは時々止まりますが許してください。',
          '保証は一切いたしません。',
          'SLAは不要です。'
        ],
        correctIndex: 0,
        explanation: '"〜を保証いたします" uses Kenjōgo/Teineigo to commit to 99.95% uptime.'
      },
      {
        id: 'ja-s5-q2',
        question: 'What is "Gijutsu-teki Fusai" (技術的負債)?',
        options: ['Technical debt', 'Corporate financial bond', 'Hardware lease cost', 'Patent royalty'],
        correctIndex: 0,
        explanation: '技術的負債 (gijutsu-teki fusai) = Technical debt.'
      },
      {
        id: 'ja-s5-q3',
        question: 'How do you defend eventual consistency (結果整合性) in a system design interview?',
        options: [
          'CAP定理に基づき、高可用性と低レイテンシを最優先するため、結果整合性を採用しました。',
          'データベースが適当に作られているからです。',
          '即時整合性は作れません。',
          '特に理由はありません。'
        ],
        correctIndex: 0,
        explanation: 'Cites CAP theorem, low latency, and 結果整合性 (eventual consistency).'
      },
      {
        id: 'ja-s5-q4',
        question: 'How do you diplomatically push back on an unreasonable feature deadline?',
        options: [
          '品質とテストカバレッジを担保するため、段階的なリリース計画をご提案させていただきます。',
          'そんなスケジュールは無理です。',
          '開発者のことを考えていません。',
          '徹夜でやればいいですか。'
        ],
        correctIndex: 0,
        explanation: '段階的なリリース計画 (staged release plan) protects engineering quality with utmost Keigo diplomacy.'
      },
      {
        id: 'ja-s5-q5',
        question: 'What is "Surūputto to Chitensei" (スループットと遅延)?',
        options: ['Throughput and Latency', 'Price and Discount', 'Color and Design', 'Battery and Weight'],
        correctIndex: 0,
        explanation: 'Throughput (スループット) and Latency (遅延 / レイテンシ).'
      }
    ],
    6: [
      {
        id: 'ja-s6-q1',
        question: 'How do you articulate "Zero-Trust Architecture" at C2 bilingual mastery in Japanese?',
        options: [
          'ゼロトラストアーキテクチャは、「決して信頼せず、常に検証する」という原則に基づき、すべてのアクセスを継続的に認証します。',
          '社員全員を解雇するシステムです。',
          'パスワードなしでログインできる仕組みです。',
          'インターネットを切断する防御法です。'
        ],
        correctIndex: 0,
        explanation: 'Captures "Never trust, always verify" (決して信頼せず、常に検証する).'
      },
      {
        id: 'ja-s6-q2',
        question: 'Translate: "Event-driven reactive architecture handles millions of concurrent non-blocking requests."',
        options: [
          'イベント駆動型リアクティブアーキテクチャは、数百万の並行ノンブロッキングリクエストを処理します。',
          'サーバーは同期通信しかできません。',
          'リクエストが増えるとフリーズします。',
          'イベントは直列に実行されます。'
        ],
        correctIndex: 0,
        explanation: 'Masterful Japanese rendering of modern distributed systems.'
      },
      {
        id: 'ja-s6-q3',
        question: 'What is "Bairingaru Gijutsu Rīdāshippu" (バイリンガル技術リーダーシップ)?',
        options: [
          'The capability to bridge global technology standards with Japanese business precision, leading cross-border engineering teams',
          'Only translating emails using machine translation',
          'Never speaking during meetings',
          'Ignoring Japanese business protocol'
        ],
        correctIndex: 0,
        explanation: 'Combines cross-cultural Keigo diplomacy with global Tier-1 architecture leadership.'
      },
      {
        id: 'ja-s6-q4',
        question: 'What is "Idempotency" (べき等性, Bekitōsei) in API design?',
        options: [
          'The property where identical operations produce the same result whether called once or multiple times',
          'Encrypting data twice',
          'Deleting duplicate database rows automatically',
          'Running background jobs faster'
        ],
        correctIndex: 0,
        explanation: 'べき等性 (bekitōsei) is the Japanese term for idempotency.'
      },
      {
        id: 'ja-s6-q5',
        question: 'What is Kaizen (改善) in software engineering culture?',
        options: [
          'Continuous incremental improvement of code quality, workflows, and team tooling',
          'Rewriting the entire application every week',
          'Canceling product releases',
          'Blaming developers for production incidents'
        ],
        correctIndex: 0,
        explanation: '改善 (Kaizen) represents continuous iterative engineering refinement.'
      }
    ]
  },

  // English Pro Track Stage Quizzes
  'lang-english-pro': {
    1: [
      {
        id: 'en-s1-q1',
        question: 'Which phrase is the most professional greeting in international engineering standups?',
        options: [
          'Good morning everyone, let us quickly align on today\'s sprint deliverables.',
          'Hey guys, whatever happens today happens.',
          'Yo, who broke the server?',
          'Morning, I do not want to talk today.'
        ],
        correctIndex: 0,
        explanation: '"Good morning everyone, let us quickly align on today\'s sprint deliverables" sets an objective, focused tone.'
      },
      {
        id: 'en-s1-q2',
        question: 'What is the difference between "I work on backend systems" vs "I am working on the auth service"?',
        options: [
          'The first expresses general habitual role; the second expresses an ongoing current sprint task.',
          'They mean the exact same thing with no grammatical difference.',
          'The first is past tense; the second is future tense.',
          'The second is incorrect English.'
        ],
        correctIndex: 0,
        explanation: 'Simple present indicates permanent/regular role; present continuous indicates active ongoing tasks.'
      },
      {
        id: 'en-s1-q3',
        question: 'How do you professionally introduce yourself in a global team kickoff?',
        options: [
          'Hi everyone, I am Alex, a Senior Systems Engineer based in Chennai. I focus on distributed systems and cloud infrastructure.',
          'I am Alex and I make computers work.',
          'Alex here, do not ask me questions.',
          'I do not have an introduction.'
        ],
        correctIndex: 0,
        explanation: 'Clearly states name, role, geographic context, and key technical focus areas.'
      },
      {
        id: 'en-s1-q4',
        question: 'Which modal verb expresses polite request rather than blunt demand?',
        options: ['Could you please take a look at...', 'You must look at...', 'Look at this right now.', 'I make you look at...'],
        correctIndex: 0,
        explanation: '"Could you please..." softens requests into collaborative teamwork.'
      },
      {
        id: 'en-s1-q5',
        question: 'How do you say numbers like "2,500,000 requests/sec" correctly in technical English?',
        options: ['Two point five million requests per second', 'Twenty-five hundred thousand requests', 'Two million five hundred requests', 'Two five zero zero zero requests'],
        correctIndex: 0,
        explanation: 'Spoken as "two point five million requests per second".'
      }
    ],
    2: [
      {
        id: 'en-s2-q1',
        question: 'How do you report a completed task during a standup update?',
        options: [
          'Yesterday, I merged the PR for ticket PROD-402 and resolved the database connection pool bottleneck.',
          'I did stuff yesterday.',
          'Yesterday was a day and code happened.',
          'I finished everything forever.'
        ],
        correctIndex: 0,
        explanation: 'Specific, actionable, and references ticket ID and architectural outcome.'
      },
      {
        id: 'en-s2-q2',
        question: 'How do you communicate a blocker clearly to your scrum master?',
        options: [
          'I am currently blocked on staging deployment pending IAM role permissions from the DevOps team.',
          'Everything is broken and nobody cares.',
          'I cannot work because AWS is bad.',
          'Do not assign me tasks.'
        ],
        correctIndex: 0,
        explanation: 'Identifies the exact blocker, environment, and required stakeholder action.'
      },
      {
        id: 'en-s2-q3',
        question: 'What does "ETA" stand for in project timelines?',
        options: ['Estimated Time of Arrival / Accomplishment', 'Electronic Technical Audit', 'Emergency Task Allocation', 'Engine Tuning Algorithm'],
        correctIndex: 0,
        explanation: 'ETA = Estimated Time of Arrival (or completion date).'
      },
      {
        id: 'en-s2-q4',
        question: 'How do you ask a clarifying question about an ambiguous user story?',
        options: [
          'Could you clarify the acceptance criteria regarding token expiration handling?',
          'This story makes no sense at all.',
          'Who wrote this bad description?',
          'I will just guess the requirements.'
        ],
        correctIndex: 0,
        explanation: 'Focuses constructively on acceptance criteria and technical clarity.'
      },
      {
        id: 'en-s2-q5',
        question: 'What is a "postmortem" meeting after a major incident?',
        options: [
          'A blameless review analyzing root cause, timeline, mitigation, and preventive action items',
          'A meeting to fire the engineer who caused the outage',
          'A funeral for the old servers',
          'A celebration of overtime hours'
        ],
        correctIndex: 0,
        explanation: 'A blameless postmortem analyzes system vulnerabilities to prevent recurrence.'
      }
    ],
    3: [
      {
        id: 'en-s3-q1',
        question: 'Which of the following is the most constructive comment on a pull request?',
        options: [
          'Consider memoizing this calculation with `useMemo`, as re-evaluating it on every keystroke causes noticeable UI stutter.',
          'This is terrible code. Rewrite it.',
          'Why did you write it like this?',
          'LGTM without looking.'
        ],
        correctIndex: 0,
        explanation: 'Provides specific technical reasoning, potential user impact, and an actionable solution.'
      },
      {
        id: 'en-s3-q2',
        question: 'What does "premature optimization" refer to?',
        options: [
          'Spending time optimizing micro-details before profiling or knowing if it impacts performance',
          'Writing tests before implementation',
          'Using TypeScript rather than JavaScript',
          'Deploying to production on Friday'
        ],
        correctIndex: 0,
        explanation: 'Donald Knuth: "Premature optimization is the root of all evil".'
      },
      {
        id: 'en-s3-q3',
        question: 'How do you explain algorithmic time complexity in an interview?',
        options: [
          'By leveraging a hash map, we reduce the lookup time from O(n) to O(1) average time, sacrificing a small amount of memory.',
          'It is fast because I wrote it.',
          'Big O does not matter in modern computers.',
          'The code runs in 5 milliseconds on my laptop.'
        ],
        correctIndex: 0,
        explanation: 'Articulates space-time complexity trade-offs with mathematical rigor.'
      },
      {
        id: 'en-s3-q4',
        question: 'What does "dry run" mean in engineering operations?',
        options: [
          'Testing a procedure or script without executing any destructive changes or writes',
          'Running code with no internet connection',
          'Deleting dry-erase whiteboard diagrams',
          'Code written without coffee'
        ],
        correctIndex: 0,
        explanation: 'A dry-run tests operations safely without modifying production state.'
      },
      {
        id: 'en-s3-q5',
        question: 'How do you diplomatically challenge an architectural assumption?',
        options: [
          'Have we considered the failure mode if the message queue experiences a network partition?',
          'Your design is completely flawed.',
          'This will fail on day one.',
          'I refuse to build this architecture.'
        ],
        correctIndex: 0,
        explanation: 'Phrased as an exploratory question ("Have we considered...?") inviting constructive analysis.'
      }
    ],
    4: [
      {
        id: 'en-s4-q1',
        question: 'In cloud architectures, what does "horizontal auto-scaling" mean?',
        options: [
          'Adding more machine instances to handle load dynamically',
          'Adding more CPU and RAM to a single machine',
          'Widening the browser window',
          'Rotating monitors horizontally'
        ],
        correctIndex: 0,
        explanation: 'Horizontal scaling = scaling out by adding instances; vertical scaling = scaling up instance capacity.'
      },
      {
        id: 'en-s4-q2',
        question: 'What is an "RFC" in technical leadership?',
        options: [
          'Request for Comments: an engineering proposal document open for team review and debate',
          'Rapid File Compilation',
          'Remote Firewall Control',
          'Recursive Function Call'
        ],
        correctIndex: 0,
        explanation: 'RFC (Request for Comments) is the gold standard for engineering proposals.'
      },
      {
        id: 'en-s4-q3',
        question: 'During an active P0 incident, how should the Incident Commander communicate?',
        options: [
          'Calmly, decisively, with timeboxed status updates and clear assignment of investigation threads',
          'By panicking in the main public Slack channel',
          'By pointing fingers at recent git commit authors',
          'By remaining silent for 3 hours'
        ],
        correctIndex: 0,
        explanation: 'Disciplined incident command requires calm, structured, timeboxed leadership.'
      },
      {
        id: 'en-s4-q4',
        question: 'What does "circuit breaker pattern" do in microservices?',
        options: [
          'Prevents cascading failures by stopping calls to a degraded downstream dependency and returning fallback responses',
          'Cuts physical power to the server rack',
          'Blocks all incoming user traffic permanently',
          'Reboots the host operating system'
        ],
        correctIndex: 0,
        explanation: 'The circuit breaker pattern isolates failures to prevent cluster-wide collapse.'
      },
      {
        id: 'en-s4-q5',
        question: 'What is "idempotence" in API operations?',
        options: [
          'An operation where making identical requests multiple times produces the exact same result as a single call',
          'A call that only executes in the morning',
          'A request that requires two passwords',
          'An API with zero latency'
        ],
        correctIndex: 0,
        explanation: 'PUT and DELETE are typically idempotent; POST is usually non-idempotent.'
      }
    ],
    5: [
      {
        id: 'en-s5-q1',
        question: 'How do you open an executive tech talk before enterprise stakeholders?',
        options: [
          'Today, we will examine how modernizing our data streaming pipeline reduced cloud spend by 32% while doubling transaction throughput.',
          'Let me show you some random code I wrote.',
          'This is going to be very boring for non-engineers.',
          'I do not know why management called this meeting.'
        ],
        correctIndex: 0,
        explanation: 'Connects engineering accomplishments directly to measurable business ROI.'
      },
      {
        id: 'en-s5-q2',
        question: 'What does "MTTR" stand for in Service Level Agreements?',
        options: ['Mean Time To Recovery / Resolution', 'Maximum Theoretical Transfer Rate', 'Minimum Task Test Requirement', 'Monthly Total Technology Revenue'],
        correctIndex: 0,
        explanation: 'MTTR is a core reliability metric measuring how fast a service recovers from failure.'
      },
      {
        id: 'en-s5-q3',
        question: 'How do you diplomatically negotiate scope creep with product managers?',
        options: [
          'To accommodate this new real-time analytics feature without compromising the release date, let us defer the export feature to Sprint 14.',
          'No, you cannot add any features ever.',
          'We will just skip all quality assurance testing.',
          'Product managers always ruin projects.'
        ],
        correctIndex: 0,
        explanation: 'Managing the iron triangle (scope, time, quality) via clear trade-offs.'
      },
      {
        id: 'en-s5-q4',
        question: 'What does "blameless postmortem culture" foster within engineering organizations?',
        options: [
          'Psychological safety, open disclosure of near-misses, and systemic hardening rather than fear',
          'Lack of accountability for gross negligence',
          'Ignoring all production bugs',
          'Refusal to document failures'
        ],
        correctIndex: 0,
        explanation: 'Blameless culture transforms failures into organizational learning and reliability.'
      },
      {
        id: 'en-s5-q5',
        question: 'How do you articulate the CAP theorem trade-off concisely?',
        options: [
          'Under network partitioning, a distributed data store must choose between consistency (guaranteeing fresh data) or availability (guaranteeing every request receives a response).',
          'All databases are either fast or slow.',
          'CAP theorem only applies to relational SQL.',
          'You can easily achieve 100% of all three at scale.'
        ],
        correctIndex: 0,
        explanation: 'Precise, professional summary of Brewer\'s CAP theorem.'
      }
    ],
    6: [
      {
        id: 'en-s6-q1',
        question: 'At C2 executive mastery, how do you explain Zero-Trust architecture in enterprise cybersecurity?',
        options: [
          'Zero-Trust eliminates implicit perimeter trust, requiring continuous authentication, strict least-privilege access, and automated posture verification for every session.',
          'It means firewalls are unnecessary.',
          'It requires locking all physical server doors.',
          'It eliminates encryption requirements.'
        ],
        correctIndex: 0,
        explanation: 'The definitive architectural definition of zero-trust security.'
      },
      {
        id: 'en-s6-q2',
        question: 'What distinguishes a Principal Engineer\'s communication from a Senior Engineer?',
        options: [
          'Strategic framing of organizational trade-offs, cross-org mentorship, and influencing architectural direction through consensus and written clarity',
          'Writing more lines of code per day',
          'Using obscure jargon to confuse juniors',
          'Avoiding all meetings and email'
        ],
        correctIndex: 0,
        explanation: 'Principal engineers multiply organizational impact through clarity, vision, and consensus.'
      },
      {
        id: 'en-s6-q3',
        question: 'What does "cognitive load" mean in API and developer experience design?',
        options: [
          'The mental effort required by developers to understand, configure, and operate a system correctly',
          'The amount of RAM an IDE consumes',
          'The time it takes to compile code',
          'The number of open browser tabs'
        ],
        correctIndex: 0,
        explanation: 'Minimizing cognitive load is central to modern platform engineering and DevEx.'
      },
      {
        id: 'en-s6-q4',
        question: 'Translate the leadership maxim: "Strong opinions, loosely held."',
        options: [
          'Formulate reasoned architectural hypotheses with conviction, but remain eager to pivot when presented with superior empirical evidence',
          'Argue aggressively and never admit mistake',
          'Have no opinion and let others decide everything',
          'Change frameworks every sprint randomly'
        ],
        correctIndex: 0,
        explanation: 'The hallmark of intellectual humility and senior scientific engineering.'
      },
      {
        id: 'en-s6-q5',
        question: 'What does "Bilingual Technical Leadership" deliver to Tier-1 engineering organizations?',
        options: [
          'Unrivaled cross-border collaboration, culturally attuned mentorship, and the ability to articulate deep architectural vision in both native and international corporate contexts',
          'The ability to translate code into poetry',
          'Faster typing speeds on multilingual keyboards',
          'Exemption from writing technical documentation'
        ],
        correctIndex: 0,
        explanation: 'Bilingual engineering leadership unlocks global team synchronization and high-performance engineering.'
      }
    ]
  }
};

export function getStageQuiz(trackId: string, stageNumber: number): StageQuestion[] {
  if (STAGE_QUIZZES[trackId] && STAGE_QUIZZES[trackId][stageNumber]) {
    return STAGE_QUIZZES[trackId][stageNumber];
  }
  // Fallback to Spanish or English if track not directly mapped
  const fallbackTrack = STAGE_QUIZZES['lang-english-pro'] || STAGE_QUIZZES['lang-spanish'];
  return fallbackTrack[stageNumber] || fallbackTrack[1];
}
