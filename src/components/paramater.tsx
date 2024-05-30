import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Parameter } from "@/types/GraphData";

interface ParameterProps {
  parameter: Parameter;
}

export function Parameter({ parameter }: ParameterProps) {
  return (
    <Card key={parameter.ID} className="dark min-w-20">
      <CardHeader>
        <CardTitle>{parameter.property}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{parameter.value}</p>
      </CardContent>
    </Card>
  );
}
