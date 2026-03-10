import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, FormsModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
activeTabId  = 'tab-1';
tabs = [{id:'tab-1',label:'HTML'},{id:'tab-2',label:'CSS'},{id:'tab-3',label:'Javascript'}]
panels = [{id:'panel-1',desc:"The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."},
  {id:'panel-2',desc:"Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."},
  {id:'panel-3',desc:" JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTMLand CSS."}
]

ngOnInit(){}

tabClick(e:any){
    let tab = (e.target as HTMLElement).closest('[data-tab]');
    console.log('tab',tab)
    if(tab){
      this.activeTabId = tab.getAttribute('data-tab')!;
      console.log(this.activeTabId)
    }
}
}
 