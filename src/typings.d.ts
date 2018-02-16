/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  loggester: any
  cabit: any
}

declare var cabit: {
  start: any
  end: any
  onStart: any
  onEnd: any
  onAll: any
}
