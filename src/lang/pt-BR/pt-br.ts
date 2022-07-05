import { Capitalize } from '@libs';
import {
  PLACES,
  SUBSCRIPTIONS,
  PROFILE,
  PERSONS_TYPE,
  EVENTS,
  MEMBERS,
} from '@settings';

const CountryCode = 'pt-br';

const Errors = {
  ServerError: 'Ocorreu um error ao acessar o servidor',
  NotFound: 'Não Encontrado!',
};

const Components = {
  Filter: 'Filtrar...',
  AvatarModal: 'Selecionados:',
};

const ModuleRoutes = {
  Create: 'adicionar',
  Update: 'alterar',
};

const Auth = {
  Terms: 'Termos de Uso',
  Privacity: 'Privacidade',
  NoAccount: 'Não tem uma conta?',
  SignIn: {
    Route: 'entrar',
    RegistrationSuccess: 'Cadastro realizado com sucesso!',
    ChangePasswordSuccess: 'Senha alterada com sucesso!',
    InviteAccepted: 'Convite Aceito!',
    InvalidEmail: 'Email inválido!',
    Title: `Entre em seu ${PLACES.SINGLE}`,
    Email: 'Email',
    Password: 'Senha',
    ForgotPassword: 'Esqueceu a Senha?',
    SignIn: 'Entrar',
  },
  ForgotPassword: {
    Route: 'esqueceu-a-senha',
    InvalidEmail: 'Email inválido!',
    ForgotPassword: 'Esqueceu a Senha?',
    TypeYourEmail: 'Digite seu email e receba o link de recuperação',
    Email: 'Email',
    Back: 'Voltar para Entrar',
    SendCode: 'Enviar Código',
  },
  ChangePassword: {
    Route: 'mudar-senha',
    NoCodeError: 'Não foi possível recuperar o código, verifique seu email.',
    SeeEmail: 'Veja o email * e preencha o código.',
    SeeValidate: 'Válido até às * de',
    DifferentPassword: 'Senhas são diferentes!',
    Code: 'Código',
    NewPassword: 'Nova Senha',
    RepeatNewPassword: 'Repita Nova Senha',
    ChangePassword: 'Alterar Senha',
  },
  SignUp: {
    Route: 'registar',
    InvalidEmail: 'Email inválido!',
    DifferentPassword: 'Senhas são diferentes!',
    Title: 'Cadastro',
    Name: 'Nome',
    Email: 'Email',
    Password: 'Senha',
    RepeatPassword: 'Repita a Senha',
    Back: 'Voltar para Entrar',
    Foward: 'Avançar',
    SignUp: 'Cadastrar',
  },
  Plans: {
    Route: 'planos',
    ChangeProfissional:
      'O plano pode ser alterado posteriormente para Profissional.',
    ChangeBasicOrProfissional:
      'O plano pode ser alterado posteriormente para Básico ou Profissional.',
    FreeTrial: 'Período de testes de 15 dias!',
    Details: 'Características',
    Foward: 'Avançar',
    Period: {
      Monthly: 'mensal',
      Month: 'mês',
      Biannual: 'semestral',
      Halfyear: 'semestre',
      Year: 'ano',
    },
  },
  Subscription: {
    Route: 'pagamento',
    Title: `Pagamento da ${SUBSCRIPTIONS.SINGLE}`,
    CardOwner: 'Titular do cartão',
    CardNumber: 'Número do Cartão',
    CardValid: 'Vencimento',
    CardSecurityCodeAbbr: 'Cód. de Segurança',
    CardSecurityCode: 'Código de Segurança',
    UserDocument: 'Documento',
    UserDocumentType: 'Tipo de Documento',
    UserDocumentNumber: 'Número do Documento',
    Foward: 'Avançar',
  },
  Invite: {
    Route: 'convite',
  },
};

const Layout = {
  All: 'Todos',
  Today: 'Hoje',
  In: 'em',
  Day: 'dia',
  Days: 'dias',
  Finish: 'termina',
  IncompleteData: 'Complete o(s) dado(s) abaixo para liberar o sistema.',
  IncompleteProfile: `Acesse seu ${PROFILE.SINGLE} clicando * no canto superior direito.`,
  IncompleteProfileAvatar: 'em sua foto',
  IncompleteProfileInitial: 'em sua inicial',
  IncompleteProfileTitle: `Seu ${PROFILE.SINGLE} está Incompleto`,
  IncompleteProfileEmphasis: 'Incompleto',
  NoPlace: `Acesse ${PLACES.PLURAL} clicando no menu ao lateral.`,
  NoPlaceTitle: `Nenhum ${PLACES.SINGLE} Cadastrado`,
  Menu: {
    Footer: {
      Settings: 'Preferências',
    },
  },
  Nav: {
    Profile: `Seu ${PROFILE.SINGLE}`,
    Subscription: SUBSCRIPTIONS.SINGLE,
    Logout: 'Sair',
  },
  Notifications: {
    Title: 'Notificações',
  },
};

const NotFound = {
  Code: '404',
  Title: 'Oops! Página não Encontrada.',
  Description: 'A página que você está procurando não existe.',
  Link: 'Clique aqui para retornar para página inicial',
};

const Profile = {
  AvatarExtension: 'Somente arquivo JPG ou PNG',
  AvatarSize: 'Arquivo deve ter até 1 mega',
  Updated: `${PROFILE.SINGLE} Alerado com Sucesso!`,
  Name: 'Nome',
  Email: 'Email',
  Phone: 'Telefone',
  ZipCode: 'CEP',
  Address: 'Endereço',
  Number: 'Número',
  Complement: 'Complemento',
  Neighborhood: 'Bairro',
  City: 'Cidade',
  State: 'UF',
  Submit: `Alterar ${PROFILE.SINGLE}`,
};

const Subscriptions = {
  Back: 'Voltar',
  Submit: 'Alterar Plano',
  Title: SUBSCRIPTIONS.SINGLE,
  Payments: {
    Paid: 'Pago',
    Open: 'Em Aberto',
    Title: 'Pagamentos',
    Date: 'Data',
    Amount: 'Valor',
    Status: 'Status',
  },
  CreditCards: {
    Active: 'Ativo',
    Inactive: 'Inativo',
    CreditCards: 'Cartões',
    Owner: 'Titular',
    Number: 'Número',
    Valid: 'Validade',
    Status: 'Status',
  },
};

const Places = {
  Updated: `${PLACES.SINGLE} alterado com sucesso!`,
  Deleted: `${PLACES.SINGLE} removido com sucesso!`,
  ConfirmDelete: `Excluir ${PLACES.SINGLE}:`,
  ConfirmDeleteContent: `Você tem certeza que quer excluir o ${PLACES.SINGLE} * ? Todos os dados desse ${PLACES.SINGLE} serão perdidos. Essa ação não poderá ser desfeita.`,
  BasicPlan: `Somente 1 ${PLACES.SINGLE} permitido no Plano Básico`,
  List: {
    HeaderItems: {
      Name: PLACES.SINGLE,
      City: 'Cidade',
      InCharge: 'Responsáveis',
      Employees: 'Colaboradores',
      Status: 'Status',
    },
    NoData: `Nenhum ${PLACES.PLURAL} Cadastrado`,
    Add: `${PLACES.SINGLE} cadastrado com sucesso!`,
  },
  Form: {
    Name: 'Nome',
    Email: 'Email',
    Phone: 'Telefone',
    ZipCode: 'CEP',
    Address: 'Endereço',
    Number: 'Número',
    Complement: 'Complemento',
    Neighborhood: 'Bairro',
    City: 'Cidade',
    State: 'UF',
    Add: `Cadastrar ${PLACES.SINGLE}`,
    Update: `Editar ${PLACES.SINGLE}`,
  },
  Details: {
    Finances: 'Financeiro',
    Edit: 'Editar',
    Make: 'Tornar',
    Active: 'Ativo',
    Inactive: 'Inativo',
    Remove: 'Remover',
    Email: 'Email',
    Phone: 'Telefone',
    Address: 'Endereço',
    InCharge: 'Responsáveis',
    Employees: 'Colaboradores',
    Add: 'Adicionar',
    Clients: PERSONS_TYPE.CLIENTS,
    Supliers: PERSONS_TYPE.SUPLIERS,
    Contacts: PERSONS_TYPE.CONTACTS,
    Events: EVENTS.PLURAL,
    ConfirmationQuestion: `Você tem certeza que quer tonar o ${PLACES.SINGLE}`,
    ConfirmationButton: 'Sim, tornar',
    OwnersModal: {
      Title: 'Selecione os Responsáveis',
      SubmitText: 'Salvar Responsáveis',
    },
    EmployeesModal: {
      Title: 'Selecione os Usuários',
      SubmitText: 'Salvar Usuários',
    },
    ClientsModal: {
      Title: `Selecione os ${Capitalize(PERSONS_TYPE.CLIENTS)}`,
      SubmitText: `Salvar ${Capitalize(PERSONS_TYPE.CLIENTS)}`,
    },
    SupliersModal: {
      Title: `Selecione os ${Capitalize(PERSONS_TYPE.SUPLIERS)}`,
      SubmitText: `Salvar ${Capitalize(PERSONS_TYPE.SUPLIERS)}`,
    },
    ContactsModal: {
      Title: `Selecione os ${Capitalize(PERSONS_TYPE.CONTACTS)}`,
      SubmitText: `Salvar ${Capitalize(PERSONS_TYPE.CONTACTS)}`,
    },
  },
};

const Members = {
  BasicPlan: `Somente 1 ${MEMBERS.SINGLE} permitido no Plano Básico`,
  List: {
    HeaderItems: {
      Name: 'Nome',
      Phone: 'Telefone',
      Email: 'Email',
      Type: 'Tipo',
      Status: 'Status',
    },
    NoData: `Nenhum ${MEMBERS.SINGLE} Cadastrado`,
    Add: `${MEMBERS.SINGLE} cadastrado com sucesso!`,
  },
  Form: {
    Name: 'Nome',
    Email: 'Email',
    Add: 'Enviar Convite',
  },
  InviteSend: {
    Title: 'Reenviar convite para: ',
    Content: 'Você tem certeza que quer reenviar o convite para ',
    Button: 'Sim, Enviar',
    Alert: 'Convite enviado com sucesso!',
  },
  InviteDelete: {
    Title: 'Excluir convite para: ',
    Content: 'Você tem certeza que quer excluir o convite para ',
    Button: 'Sim, Excluir',
    Alert: 'Convite removido com sucesso!',
  },
};

const Persons = {
  Types: {
    Clients: 'Pacientes',
    Supliers: 'Forcenedores',
    Contacts: 'Contatos',
    pacientes: {
      single: 'Paciente',
      plural: 'Pacientes',
    },
    forcenedores: {
      single: 'Forcenedor',
      plural: 'Forcenedores',
    },
    contatos: {
      single: 'Contato',
      plural: 'Contatos',
    },
  },
  List: {
    HeaderItems: {
      Name: 'Nome',
      Phone: 'Telefone',
      Email: 'Email',
      CityState: 'Cidade | UF',
    },
    NoData: 'Nenhum * Cadastrado',
    Add: `${PERSONS_TYPE.CLIENTS} cadastrado com sucesso!`,
  },
  Details: {
    SendingFile: 'Enviando arquivos, aguarde...',
    Edit: 'Editar',
  },
  Form: {
    Name: 'Nome',
    Phone: 'Telefone',
    Email: 'Email',
    CityState: 'Cidade | UF',
  },
  InviteSend: {
    Title: 'Reenviar convite para: ',
    Content: 'Você tem certeza que quer reenviar o convite para ',
    Button: 'Sim, Enviar',
    Alert: 'Convite enviado com sucesso!',
  },
  InviteDelete: {
    Title: 'Excluir convite para: ',
    Content: 'Você tem certeza que quer excluir o convite para ',
    Button: 'Sim, Excluir',
    Alert: 'Convite removido com sucesso!',
  },
};

export const Lang = {
  CountryCode,
  Errors,
  Components,
  ModuleRoutes,
  Auth,
  Layout,
  NotFound,
  Profile,
  Subscriptions,
  Places,
  Members,
  Persons,
};
