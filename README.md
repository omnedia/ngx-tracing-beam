# ngx-tracing-beam

`@omnedia/ngx-tracing-beam` is an Angular component that renders a dynamic tracing beam that follows the user's scroll progress. This component is ideal for visually connecting different sections of content on a page, providing an interactive and engaging user experience.

## Features

- Interactive Tracing Beam: The beam dynamically traces a path as the user scrolls, visually connecting different sections of your content.
- Customizable Appearance: Control the beam's stroke color, gradient colors, and animation duration to match your design needs.
- Smooth Animations: The tracing beam animates smoothly as the user scrolls, with customizable easing functions to control the motion.
- Viewport Awareness: The beam's position updates in response to scrolling and resizing, ensuring it always stays aligned with your content.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-tracing-beam
```

## Usage

Import the `NgxTracingBeamComponent` in your Angular module or component:

```typescript
import { NgxTracingBeamComponent } from '@omnedia/ngx-tracing-beam';

@Component({
  ...
  imports: [
    ...
    NgxTracingBeamComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-tracing-beam
  [strokeColor]="'#3498db'"
  [gradientTop]="'#ffcc00'"
  [gradientMiddle]="'#e74c3c'"
  [gradientBottom]="'#9b59b6'"
  [animationDuration]="700"
  styleClass="custom-tracing-beam"
>
  <div class="content-section">
    <h2>Section 1</h2>
    <p>Your content here...</p>
  </div>
  <div class="content-section">
    <h2>Section 2</h2>
    <p>Your content here...</p>
  </div>
</om-tracing-beam>
```

## How It Works

- Tracing Beam: The component draws a beam that moves as the user scrolls, visually linking content sections. The beam's path is automatically calculated based on the position and size of your content.
- Customizable Stroke and Gradient: Define the stroke color and gradient colors for the beam, giving you full control over its appearance.
- Smooth Scroll Animation: The beam's movement is smoothly animated, with the ability to customize the animation duration and easing function for a more tailored experience.

## API

```html
<om-tracing-beam
  [strokeColor]="strokeColor"
  [gradientTop]="gradientTop"
  [gradientMiddle]="gradientMiddle"
  [gradientBottom]="gradientBottom"
  [animationDuration]="animationDuration"
  [easingFunction]="easingFunction"
  styleClass="your-custom-class"
>
  <ng-content></ng-content>
</om-tracing-beam>
```

- `strokeColor` (optional): The color of the beam's stroke. Defaults to '#9091a04b'.
- `gradientTop` (optional): The color at the top of the gradient. Defaults to '#AE48FF'.
- `gradientMiddle` (optional): The color at the middle of the gradient. Defaults to '#6344F5'.
- `gradientBottom` (optional): The color at the bottom of the gradient. Defaults to '#18CCFC'.
- `animationDuration` (optional): The duration of the beam's animation in milliseconds. Defaults to 500ms.
- `easingFunction` (optional): A custom easing function for the animation. Defaults to a cubic easing function.
- `styleClass` (optional): Custom CSS class to apply to the .om-tracing-beam container.

## Example

```html
<om-tracing-beam [strokeColor]="'#e74c3c'" [gradientTop]="'#3498db'" [gradientMiddle]="'#2ecc71'" [gradientBottom]="'#9b59b6'">
  <div class="content">
    <h2>Scroll-Linked Content</h2>
    <p>This content is linked with a dynamic tracing beam that follows the scroll progress.</p>
  </div>
</om-tracing-beam>
```

This example creates a tracing beam with a red stroke and a blue-to-purple gradient that animates as the user scrolls through the content.

## Smart Scroll Context

When the om-tracing-beam is used in different scroll contexts, such as directly within the viewport or inside a nested scrollable element, it intelligently binds the scroll event listener to the nearest scrollable parent or defaults to the window if none is found. This ensures the beam's position is always calculated relative to the correct scroll context.
<br>
This example shows how you can integrate the tracing beam within a scrollable div to ensure it functions correctly across multiple environments:

```html
<div style="height: 700px; overflow-y: scroll;">
  <om-tracing-beam styleClass="nested-scroll-context">
    <div style="height: 2000px;">
      <!-- Long content that makes the container scroll -->
      <h1>Start of Content</h1>
      <p>Content continues...</p>
    </div>
  </om-tracing-beam>
</div>
```

## Styling

```html
<om-tracing-beam styleClass="custom-beam-style">
  <div class="content">
    <h2>Styled Tracing Beam</h2>
    <p>Customize the beam with your own styles.</p>
  </div>
</om-tracing-beam>
```

```css
/* Global styling */
.custom-beam-style .beam-dot {
  background-color: #ffcc00;
  border: 2px solid #e74c3c;
}

.custom-beam-style .beam-inner-dot {
  background-color: #2ecc71;
  border-color: #27ae60;
}
```

This CSS will style the dot at the start of the tracing beam with custom colors.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.