import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { API_BASE_URL } from "./lib/utils";
import {
  Heart,
  Calendar,
  Users,
  Settings,
  Home,
  BookOpen,
  HelpCircle,
  User,
} from "lucide-react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [userType, setUserType] = useState("");

  // Componente de Login
  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-b from-red-400 to-orange-400 flex flex-col items-center justify-center p-4">
      <div className="bg-red-50 rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="../src/assets/logo-2.png"></img>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            GRUPO PONGAIENSE DE COMBATE AO CÂNCER
          </h1>
          <p className="text-gray-600 text-sm">
            Faça parte e saiba como ajudar
          </p>
        </div>

        <div className="space-y-4">
          <Input placeholder="usuário" className="bg-gray-200 border-none" />
          <Input
            placeholder="senha"
            type="password"
            className="bg-gray-200 border-none"
          />
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setCurrentView("userSelection")}
          >
            Login
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white"
            onClick={() => setCurrentView("register")}
          >
            + Cadastre-se
          </Button>
          <Button
            variant="outline"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
          >
            G Logar com o Google
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © Copyright 2025 T3J Tech
        </p>
      </div>
    </div>
  );

  // Componente de Seleção de Usuário
  const UserSelectionView = () => (
    <div className="min-h-screen bg-gradient-to-b from-red-400 to-orange-400 flex flex-col items-center justify-center p-4">
      <div className="bg-red-50 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">
          Selecione seu tipo de usuário
        </h2>
        <div className="space-y-4">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto"
            onClick={() => {
              setUserType("paciente");
              setCurrentView("dashboard");
            }}
          >
            <div className="text-center">
              <User className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Paciente</div>
              <div className="text-sm opacity-90">
                Acesse seus dados e informações
              </div>
            </div>
          </Button>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white p-6 h-auto"
            onClick={() => {
              setUserType("voluntario");
              setCurrentView("dashboard");
            }}
          >
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Voluntário</div>
              <div className="text-sm opacity-90">
                Veja compromissos e tarefas
              </div>
            </div>
          </Button>

          <Button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white p-6 h-auto"
            onClick={() => {
              setUserType("apoiador");
              setCurrentView("dashboard");
            }}
          >
            <div className="text-center">
              <HelpCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Apoiador</div>
              <div className="text-sm opacity-90">Como posso ajudar?</div>
            </div>
          </Button>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto"
            onClick={() => {
              setUserType("administrador");
              setCurrentView("dashboard");
            }}
          >
            <div className="text-center">
              <Settings className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Administrador</div>
              <div className="text-sm opacity-90">
                Gerenciar usuários e tarefas
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  // Componente de Cadastro
  const RegisterView = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("Apoiador");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
      setSubmitting(true);
      setMessage("");
      try {
        const resp = await fetch(`${API_BASE_URL}/api/v1/users/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, role }),
        });
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(text || `Request failed: ${resp.status}`);
        }
        const data = await resp.json();
        setMessage(`User created: ${data.id}`);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setRole("Apoiador");
      } catch (err) {
        setMessage(`Error: ${err.message}`);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-orange-400 flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("login")}
              className="p-2"
            >
              ←
            </Button>
            <h2 className="text-xl font-bold text-center flex-1">Cadastro</h2>
          </div>

          <div className="space-y-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="bg-gray-200 border-none" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="bg-gray-200 border-none" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" className="bg-gray-200 border-none" />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone" className="bg-gray-200 border-none" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 bg-gray-200 rounded-lg border-none">
              <option value="Apoiador">Apoiador</option>
              <option value="Voluntário">Voluntário</option>
              <option value="Paciente">Paciente</option>
            </select>
            <Button disabled={submitting} onClick={handleSubmit} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              {submitting ? "Enviando..." : "+ Cadastre-se"}
            </Button>

            {message && (
              <div className="text-sm text-center mt-2 {message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente do Dashboard
  const DashboardView = () => {
    const [activeTab, setActiveTab] = useState("home");

    const renderContent = () => {
      switch (activeTab) {
        case "home":
          return (
            <div className="p-4 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">
                  Olá,{" "}
                  {userType === "paciente"
                    ? "Maria"
                    : userType === "voluntario"
                    ? "Vitória"
                    : userType === "apoiador"
                    ? "João"
                    : "Eliana"}
                </h1>
                <p className="text-gray-600">Acesse os serviços disponíveis</p>
              </div>

              {userType === "paciente" && (
                <div className="space-y-4">
                  <Card className="bg-blue-500 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-8 h-8" />
                        <div>
                          <h3 className="font-semibold">Diário do paciente</h3>
                          <p className="text-sm opacity-90">
                            Acesse seus relatos e informações
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Conheça o Grupo</h4>
                        <p className="text-xs text-gray-600">
                          Confira nossa história e o que fazemos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Como ajudar?</h4>
                        <p className="text-xs text-gray-600">
                          Nosso canal de doações
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          Material educativo
                        </h4>
                        <p className="text-xs text-gray-600">
                          Acesse materiais que podem ajudar pacientes
                          oncológicos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          Como ser um voluntário?
                        </h4>
                        <p className="text-xs text-gray-600">
                          Saiba como participar do grupo
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {userType === "voluntario" && (
                <div className="space-y-4">
                  <Card className="bg-red-500 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-8 h-8" />
                        <div>
                          <h3 className="font-semibold">Área do voluntário</h3>
                          <p className="text-sm opacity-90">
                            Veja nossos próximos compromissos e tarefas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Como ajudar?</h4>
                        <p className="text-xs text-gray-600">
                          Nosso canal de doações
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          Material educativo
                        </h4>
                        <p className="text-xs text-gray-600">
                          Acesse materiais que podem ajudar pacientes
                          oncológicos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Conheça o Grupo</h4>
                        <p className="text-xs text-gray-600">
                          Confira nossa história e o que fazemos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-300">
                      <CardContent className="p-4 text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <h4 className="font-medium text-sm">
                          Como receber apoio?
                        </h4>
                        <p className="text-xs text-gray-600">
                          Saiba como participar do grupo
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {userType === "apoiador" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Conheça o Grupo</h4>
                        <p className="text-xs text-gray-600">
                          Confira nossa história e o que fazemos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Outros serviços</h4>
                        <p className="text-xs text-gray-600">
                          Saiba mais opções que você pode acessar por aqui
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Como ajudar?</h4>
                        <p className="text-xs text-gray-600">
                          Nosso canal de doações
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          Material educativo
                        </h4>
                        <p className="text-xs text-gray-600">
                          Acesse materiais que podem ajudar pacientes
                          oncológicos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">
                          Como ser um voluntário?
                        </h4>
                        <p className="text-xs text-gray-600">
                          Saiba como participar do grupo
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-300">
                      <CardContent className="p-4 text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <h4 className="font-medium text-sm">
                          Como receber apoio?
                        </h4>
                        <p className="text-xs text-gray-600">
                          Saiba como participar do grupo
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {userType === "administrador" && (
                <div className="space-y-4">
                  <Card className="bg-red-500 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-8 h-8" />
                        <div>
                          <h3 className="font-semibold">Área do voluntário</h3>
                          <p className="text-sm opacity-90">
                            Veja nossos próximos compromissos e tarefas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-500 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-8 h-8" />
                        <div>
                          <h3 className="font-semibold">
                            Área do administrador
                          </h3>
                          <p className="text-sm opacity-90">
                            Gerenciar os usuários e tarefas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Conheça o Grupo</h4>
                        <p className="text-xs text-gray-600">
                          Confira nossa história e o que fazemos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-300">
                      <CardContent className="p-4 text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h4 className="font-medium text-sm">Outros serviços</h4>
                        <p className="text-xs text-gray-600">
                          Saiba mais opções que você pode acessar por aqui
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          );

        case "calendar":
          return (
            <div className="p-4">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold flex-1">Calendário</h2>
              </div>

              <div className="flex mb-4">
                <Button className="bg-red-500 text-white rounded-r-none">
                  Geral
                </Button>
                <Button
                  variant="outline"
                  className="bg-orange-400 text-white rounded-l-none"
                >
                  Pessoal
                </Button>
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="ghost">←</Button>
                  <h3 className="font-semibold">Maio, 2025</h3>
                  <Button variant="ghost">→</Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4 text-center text-sm">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => (
                  <div key={i} className="p-2 font-semibold">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`p-2 border rounded ${
                      i === 15 ? "bg-red-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    {i < 31 ? i + 1 : ""}
                  </div>
                ))}
              </div>

              <Card className="bg-gray-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white rounded px-2 py-1 text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">19:30 | Reunião mensal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );

        case "news":
          return (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6">Novidades</h2>

              <div className="space-y-4">
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 text-white rounded px-2 py-1 text-sm">
                        10/05
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Visita ao Hospital Amaral
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 text-white rounded px-2 py-1 text-sm">
                        01/05
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Balancete financeiro de abril
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-500 text-white rounded px-2 py-1 text-sm">
                          10/05
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Visita ao Hospital Amaral
                          </h3>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 ml-12">
                        <p>Maiores detalhes...</p>
                        <p>...</p>
                        <p>...</p>
                        <p className="text-blue-500">
                          Abra o link para ver as fotos.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 text-white rounded px-2 py-1 text-sm">
                        01/04
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Balancete financeiro de março
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );

        case "about":
          return (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6">Conheça o grupo</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nossa História</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Fundado em 25 de junho de 1998, o Grupo Pongaiense de
                      Combate ao Câncer tem desempenhado um papel fundamental no
                      apoio a pacientes com câncer, oferecendo suporte essencial
                      àqueles que enfrentam a doença.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nossa Missão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Garantir que os pacientes de Pongaí tenham acesso a
                      exames, medicamentos e consultas quando esses serviços não
                      estão disponíveis na rede pública.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Números</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-red-500">
                          38
                        </div>
                        <div className="text-sm text-gray-600">
                          Voluntários ativos
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-500">
                          37
                        </div>
                        <div className="text-sm text-gray-600">
                          Pacientes assistidos
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );

        default:
          return <div className="p-4">Configurações em desenvolvimento...</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-400 to-orange-400 text-white p-4">
          <div className="flex items-center justify-between">
            <Heart className="w-6 h-6" />
            <h1 className="text-sm font-semibold">
              GRUPO PONGAIENSE DE COMBATE AO CÂNCER
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("login")}
              className="text-white hover:bg-white/20"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="pb-20">{renderContent()}</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-orange-400 text-white">
          <div className="flex justify-around py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center space-y-1 text-white hover:bg-white/20 ${
                activeTab === "home" ? "bg-white/20" : ""
              }`}
            >
              <Home className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("calendar")}
              className={`flex flex-col items-center space-y-1 text-white hover:bg-white/20 ${
                activeTab === "calendar" ? "bg-white/20" : ""
              }`}
            >
              <Calendar className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("news")}
              className={`flex flex-col items-center space-y-1 text-white hover:bg-white/20 ${
                activeTab === "news" ? "bg-white/20" : ""
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("settings")}
              className={`flex flex-col items-center space-y-1 text-white hover:bg-white/20 ${
                activeTab === "settings" ? "bg-white/20" : ""
              }`}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal
  switch (currentView) {
    case "login":
      return <LoginView />;
    case "register":
      return <RegisterView />;
    case "userSelection":
      return <UserSelectionView />;
    case "dashboard":
      return <DashboardView />;
    default:
      return <LoginView />;
  }
}

export default App;
