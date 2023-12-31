import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgxEditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html = '';
  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
