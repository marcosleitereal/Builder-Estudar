import { MainLayout } from "@/components/layout/MainLayout";
import { GeneratePanel } from "@/components/study/GeneratePanel";
import { WelcomeBanner } from "@/components/study/WelcomeBanner";
import { RecentSummaries } from "@/components/study/RecentSummaries";
import { RecentFlashcards } from "@/components/study/RecentFlashcards";
import { RecentMindMaps } from "@/components/study/RecentMindMaps";
import { StudyStats } from "@/components/study/StudyStats";
import { AchievementsPreview } from "@/components/study/AchievementsPreview";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao StudyAI
          </h1>
          <p className="text-lg text-muted-foreground">
            Transforme seus materiais de estudo em conteúdo personalizado com o
            poder da Inteligência Artificial
          </p>
        </div>
        <WelcomeBanner />
        <GeneratePanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyStats />
          <AchievementsPreview />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentSummaries />
          <RecentFlashcards />
        </div>
        <RecentMindMaps />
      </div>
    </MainLayout>
  );
};
export default Index;
