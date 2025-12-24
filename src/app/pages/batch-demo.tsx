import { useEffect } from "react";
import { BatchDemo } from "../components/batch-demo";

export function BatchDemoPage() {
  useEffect(() => {
    document.title = "Batch Ordering Demo — Sentra";
  }, []);

  return <BatchDemo />;
}