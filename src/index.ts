import externalFunction from './externalModule';

// Start of Selection
export class TSLib {
  private readonly name = 'TSLib';

  public test() {
    externalFunction();
  }

  public logMousePosition() {
    document.addEventListener('mousemove', (event) => {
      console.log(`Mouse Position: X=${event.clientX}, Y=${event.clientY}`);
    });
  }
}