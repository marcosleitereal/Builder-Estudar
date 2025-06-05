import { MainLayout } from "@/components/layout/MainLayout";
import { GeneratePanel } from "@/components/study/GeneratePanel";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to StudyAI
          </h1>
          <p className="text-lg text-muted-foreground">
            Transform your learning materials into personalized study content
            with the power of AI
          </p>
        </div>

        <GeneratePanel />
      </div>
    </MainLayout>
  );
};

export default Index;
