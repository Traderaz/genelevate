'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CourseData } from '@/app/creator-dashboard/create-course/page';

interface CourseCustomizationProps {
  data: CourseData;
  onUpdate: (updates: Partial<CourseData>) => void;
}

export function CourseCustomization({ data, onUpdate }: CourseCustomizationProps) {
  const fonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'];
  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>Customize your course's color scheme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={data.styling.primaryColor}
                  onChange={(e) => onUpdate({
                    styling: { ...data.styling, primaryColor: e.target.value }
                  })}
                  className="w-20 h-10"
                />
                <Input
                  value={data.styling.primaryColor}
                  onChange={(e) => onUpdate({
                    styling: { ...data.styling, primaryColor: e.target.value }
                  })}
                  placeholder="#e50914"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={data.styling.secondaryColor}
                  onChange={(e) => onUpdate({
                    styling: { ...data.styling, secondaryColor: e.target.value }
                  })}
                  className="w-20 h-10"
                />
                <Input
                  value={data.styling.secondaryColor}
                  onChange={(e) => onUpdate({
                    styling: { ...data.styling, secondaryColor: e.target.value }
                  })}
                  placeholder="#221f1f"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Choose fonts and sizes for your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Font Family</label>
            <select
              value={data.styling.fontFamily}
              onChange={(e) => onUpdate({
                styling: { ...data.styling, fontFamily: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            >
              {fonts.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Font Size</label>
            <div className="flex gap-2">
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => onUpdate({
                    styling: { ...data.styling, fontSize: size.value as any }
                  })}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    data.styling.fontSize === size.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

