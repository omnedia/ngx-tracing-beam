import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "om-tracing-beam",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-tracing-beam.component.html",
  styleUrls: ["./ngx-tracing-beam.component.scss"],
})
export class NgxTracingBeamComponent implements AfterViewInit, OnDestroy {
  @ViewChild("wrapperRef") wrapperRef!: ElementRef<HTMLElement>;
  @ViewChild("contentRef") contentRef!: ElementRef<HTMLElement>;

  @Input("styleClass")
  styleClass?: string;

  style: any = {};

  @Input("animationDuration")
  private animationDuration = 500;

  @Input("strokeColor")
  set strokeColorValue(color: string) {
    this.strokeColor = color;
    this.style["--om-tracing-beam-stroke-color"] = color;
  }

  strokeColor = "#9091a04b";

  @Input("gradientTop")
  gradientTop: string = "#AE48FF";

  @Input("gradientMiddle")
  gradientMiddle: string = "#6344F5";

  @Input("gradientBottom")
  gradientBottom: string = "#18CCFC";

  @Input("easingFunction")
  easingFunction: (time: number) => number = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  private scrollableParent: HTMLElement | Window = window;
  private scrollListener!: () => void;

  private y1Target = 0;
  private y2Target = 0;

  svgHeight: number = 0;
  y1: number = 50;
  y2: number = 50;

  private isInView = false;
  private intersectionObserver?: IntersectionObserver;

  /* @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (!this.isInView) {
      return;
    }

    this.updateBeamPosition();
  } */

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.isInView) {
        this.isInView = true;
      } else if (!entry.isIntersecting && this.isInView) {
        this.isInView = false;
      }
    });
    this.intersectionObserver.observe(this.wrapperRef.nativeElement);

    window.addEventListener("resize", () => this.calculateSvgHeight());

    this.calculateSvgHeight();

    this.determineScrollContext();
    this.updateBeamPosition();
  }

  ngOnDestroy(): void {
    this.removeScrollListener();

    window.removeEventListener("resize", () => this.calculateSvgHeight());

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private determineScrollContext() {
    let parent = this.wrapperRef.nativeElement.parentElement;
    while (parent && parent !== document.body) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") {
        this.scrollableParent = parent;
        break;
      }
      parent = parent.parentElement;
    }
    this.setupScrollListener();
  }

  private setupScrollListener() {
    this.scrollListener = this.renderer.listen(
      this.scrollableParent,
      "scroll",
      () => this.updateBeamPosition()
    );
  }

  private removeScrollListener() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  private calculateSvgHeight() {
    this.svgHeight = this.getOuterHeight(this.contentRef.nativeElement) - 16;
    this.updateBeamPosition();
  }

  private updateBeamPosition() {
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    const scrollHeight =
      this.scrollableParent === window
        ? window.innerHeight
        : (this.scrollableParent as HTMLElement).clientHeight;

    const topPosition =
      this.scrollableParent === window
        ? rect.top * -1
        : (this.scrollableParent as HTMLElement).scrollTop;

    let progress = (topPosition + scrollHeight) / rect.height;
    progress = progress - (scrollHeight / rect.height) * (1 - progress);

    if (topPosition <= 0) {
      this.setBeamPosition(0, 0);
      return;
    }

    if (topPosition >= rect.height) {
      this.setBeamPosition(rect.height, rect.height);
      return;
    }

    const newY2 = topPosition;
    let newY1 = topPosition + scrollHeight * progress - 50 * progress;

    if (progress >= 1) {
      newY1 = rect.height;
    }

    this.setBeamPosition(newY1, newY2);
  }

  private setBeamPosition(y1: number, y2: number) {
    this.y1Target = y1;
    this.y2Target = y2;

    this.animateBeamPosition();
  }

  private animateBeamPosition() {
    const startTime = performance.now();

    const initialY1 = this.y1;
    const initialY2 = this.y2;
    const deltaY1 = this.y1Target - initialY1;
    const deltaY2 = this.y2Target - initialY2;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / this.animationDuration, 1);
      const easedProgress = this.easingFunction(t);

      this.y1 = initialY1 + deltaY1 * easedProgress;
      this.y2 = initialY2 + deltaY2 * easedProgress;

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private getOuterHeight(el: HTMLElement): number {
    const style = window.getComputedStyle(el);

    const height = el.getBoundingClientRect().height;
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);

    return height + marginTop + marginBottom;
  }
}
