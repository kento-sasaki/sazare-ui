import { Steps as ArkSteps } from '@ark-ui/react/steps'

import { stepper } from '../../../styled-system/recipes'

export interface StepperStep {
  label: string
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
// v0.1は進捗インジケータとしての利用を想定し、Content/CompletedContent/Progressは
// スコープ外（YAGNI）。ステップ間でフォーム等を出し分ける用途が必要になった時点で追加する
export interface StepperProps {
  steps: StepperStep[]
  step?: number
  defaultStep?: number
  onStepChange?: (step: number) => void
  linear?: boolean
}

export const Stepper = ({ steps, step, defaultStep, onStepChange, linear }: StepperProps) => {
  const styles = stepper()

  return (
    <ArkSteps.Root
      className={styles.root}
      count={steps.length}
      step={step}
      defaultStep={defaultStep}
      onStepChange={onStepChange ? (details) => onStepChange(details.step) : undefined}
      linear={linear}
    >
      <ArkSteps.List className={styles.list}>
        {steps.map((item, index) => (
          <ArkSteps.Item key={index} index={index} className={styles.item}>
            <ArkSteps.Trigger className={styles.trigger}>
              <ArkSteps.Indicator className={styles.indicator}>{index + 1}</ArkSteps.Indicator>
              {item.label}
            </ArkSteps.Trigger>
            {index < steps.length - 1 && <ArkSteps.Separator className={styles.separator} />}
          </ArkSteps.Item>
        ))}
      </ArkSteps.List>
      <ArkSteps.PrevTrigger className={styles.prevTrigger}>前へ</ArkSteps.PrevTrigger>
      <ArkSteps.NextTrigger className={styles.nextTrigger}>次へ</ArkSteps.NextTrigger>
    </ArkSteps.Root>
  )
}

Stepper.displayName = 'Stepper'
