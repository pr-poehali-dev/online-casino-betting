import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface BettingEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  totalPool: number;
  yesPool: number;
  noPool: number;
  yesProbability: number;
  noProbability: number;
  isActive: boolean;
}

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState<BettingEvent | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [betType, setBetType] = useState<"yes" | "no">("yes");

  const mockEvents: BettingEvent[] = [
    {
      id: "1",
      title: "Биткоин достигнет $100,000 к концу 2024",
      description:
        "Цена BTC превысит отметку в $100,000 до 31 декабря 2024 года",
      category: "Криптовалюты",
      endDate: "2024-12-31",
      totalPool: 45000,
      yesPool: 27000,
      noPool: 18000,
      yesProbability: 60,
      noProbability: 40,
      isActive: true,
    },
    {
      id: "2",
      title: "Илон Маск покинет пост CEO Tesla",
      description:
        "Илон Маск официально покинет должность CEO Tesla в течение 2024 года",
      category: "Бизнес",
      endDate: "2024-12-31",
      totalPool: 32000,
      yesPool: 12800,
      noPool: 19200,
      yesProbability: 40,
      noProbability: 60,
      isActive: true,
    },
    {
      id: "3",
      title: "Россия выиграет Чемпионат мира по футболу 2026",
      description:
        "Сборная России станет чемпионом мира по футболу в 2026 году",
      category: "Спорт",
      endDate: "2026-07-19",
      totalPool: 28000,
      yesPool: 8400,
      noPool: 19600,
      yesProbability: 30,
      noProbability: 70,
      isActive: true,
    },
  ];

  const handleBet = () => {
    if (!selectedEvent || !betAmount) return;

    const amount = parseFloat(betAmount);
    if (amount > balance) return;

    setBalance(balance - amount);
    setBetAmount("");
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">🎯 BetMarket</h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" onClick={() => setActiveTab("events")}>
                  События
                </Button>
                <Button variant="ghost" onClick={() => setActiveTab("profile")}>
                  Профиль
                </Button>
                <Button variant="ghost" onClick={() => setActiveTab("deposit")}>
                  Пополнить
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Wallet" size={20} className="text-primary" />
                <span className="text-primary font-bold">
                  ${balance.toLocaleString()}
                </span>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>ЮР</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="events">Активные события</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="deposit">Пополнить баланс</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Активные события</h2>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="TrendingUp"
                    size={20}
                    className="text-green-500"
                  />
                  <span className="text-sm text-muted-foreground">
                    Всего пула: $105,000
                  </span>
                </div>
              </div>

              <div className="grid gap-6">
                {mockEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border-border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{event.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              До{" "}
                              {new Date(event.endDate).toLocaleDateString(
                                "ru-RU",
                              )}
                            </span>
                          </div>
                          <CardTitle className="text-xl">
                            {event.title}
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Общий пул
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            ${event.totalPool.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="h-16 flex-col space-y-1 border-green-500/50 hover:bg-green-500/10"
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setBetType("yes");
                                }}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon
                                    name="Check"
                                    size={16}
                                    className="text-green-500"
                                  />
                                  <span className="font-semibold">ДА</span>
                                </div>
                                <div className="text-sm text-green-500">
                                  {event.yesProbability}% ($
                                  {event.yesPool.toLocaleString()})
                                </div>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Сделать ставку</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Событие</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedEvent?.title}
                                  </p>
                                </div>
                                <div>
                                  <Label>Тип ставки</Label>
                                  <p className="text-sm font-semibold text-green-500">
                                    ДА ({selectedEvent?.yesProbability}%)
                                  </p>
                                </div>
                                <div>
                                  <Label htmlFor="bet-amount">
                                    Сумма ставки
                                  </Label>
                                  <Input
                                    id="bet-amount"
                                    type="number"
                                    value={betAmount}
                                    onChange={(e) =>
                                      setBetAmount(e.target.value)
                                    }
                                    placeholder="0"
                                    max={balance}
                                  />
                                </div>
                                <Button onClick={handleBet} className="w-full">
                                  Сделать ставку
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="h-16 flex-col space-y-1 border-red-500/50 hover:bg-red-500/10"
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setBetType("no");
                                }}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon
                                    name="X"
                                    size={16}
                                    className="text-red-500"
                                  />
                                  <span className="font-semibold">НЕТ</span>
                                </div>
                                <div className="text-sm text-red-500">
                                  {event.noProbability}% ($
                                  {event.noPool.toLocaleString()})
                                </div>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Сделать ставку</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Событие</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedEvent?.title}
                                  </p>
                                </div>
                                <div>
                                  <Label>Тип ставки</Label>
                                  <p className="text-sm font-semibold text-red-500">
                                    НЕТ ({selectedEvent?.noProbability}%)
                                  </p>
                                </div>
                                <div>
                                  <Label htmlFor="bet-amount">
                                    Сумма ставки
                                  </Label>
                                  <Input
                                    id="bet-amount"
                                    type="number"
                                    value={betAmount}
                                    onChange={(e) =>
                                      setBetAmount(e.target.value)
                                    }
                                    placeholder="0"
                                    max={balance}
                                  />
                                </div>
                                <Button onClick={handleBet} className="w-full">
                                  Сделать ставку
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Распределение ставок</span>
                            <span className="text-muted-foreground">
                              ДА: {event.yesProbability}% / НЕТ:{" "}
                              {event.noProbability}%
                            </span>
                          </div>
                          <Progress
                            value={event.yesProbability}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Профиль пользователя</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="User" size={20} />
                      <span>Основная информация</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-xl">ЮР</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Юрий Космонавт
                        </h3>
                        <p className="text-muted-foreground">Опытный трейдер</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Баланс</p>
                        <p className="text-2xl font-bold text-primary">
                          ${balance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Активных ставок
                        </p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="BarChart3" size={20} />
                      <span>Статистика</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Всего ставок
                        </p>
                        <p className="text-2xl font-bold">27</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Успешных
                        </p>
                        <p className="text-2xl font-bold text-green-500">18</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Проигранных
                        </p>
                        <p className="text-2xl font-bold text-red-500">9</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Точность
                        </p>
                        <p className="text-2xl font-bold">66.7%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Общий доход</span>
                        <span className="text-green-500 font-semibold">
                          +$2,340
                        </span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deposit">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Пополнить баланс</h2>

              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="CreditCard" size={20} />
                      <span>Пополнение счета</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="deposit-amount">Сумма пополнения</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="100"
                        className="text-lg"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">
                        $100
                      </Button>
                      <Button variant="outline" size="sm">
                        $500
                      </Button>
                      <Button variant="outline" size="sm">
                        $1000
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Способ оплаты</Label>
                      <div className="grid gap-2">
                        <Button
                          variant="outline"
                          className="justify-start h-12"
                        >
                          <Icon name="CreditCard" size={16} className="mr-2" />
                          Банковская карта
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start h-12"
                        >
                          <Icon name="Smartphone" size={16} className="mr-2" />
                          СБП
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start h-12"
                        >
                          <Icon name="Wallet" size={16} className="mr-2" />
                          Электронный кошелек
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Пополнить баланс
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Минимальная сумма пополнения: $10
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
