import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class AppHighlight {

  @Input('appHighlight') highlightClass : string = 'table-active';
  private activeCell: HTMLElement | null = null;
  
  // host is angular giving way to access DOM
  constructor(private renderer:Renderer2, private host: ElementRef<HTMLElement>) { }

  @HostListener('mouseover',['$event'])
  onMouseover(event:MouseEvent){
    const target = event.target as HTMLElement;
    const cell = target.closest('td');

    if(!cell || !this.host.nativeElement.contains(cell)){
      return;
    }
    if(this.activeCell && this.activeCell !== cell){
      this.renderer.removeClass(this.activeCell,this.highlightClass);
    }

    this.renderer.addClass(cell,this.highlightClass );
    this.activeCell = cell;

  }

  @HostListener('mouseleave')
  onMouseLeave(){
     if (this.activeCell) {
      this.renderer.removeClass(this.activeCell, this.highlightClass);
      this.activeCell = null;
    }
  }
  

  
}
