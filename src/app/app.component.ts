import { Component, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    language: 'html',
    roundedSelection: true,
    autoIndent: 'full',
    theme: 'vs-dark',
  };
  code = this.getCode();
  showEditor = false;
  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        take(1)
      )
      .subscribe(() => {});
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {}

  //on button click function which shows the editor and language selector
  onBtnClick() {
    console.log(!this.showEditor);
    this.showEditor = !this.showEditor;
    this.code = this.getCode();
    this.editorOptions.language = 'html';
  }

  //on language select change function
  onSelectChange(val: string) {
    this.editorOptions.language = val;
    if (val == 'java') this.code = '//Start your Java code';
    else if (val == 'javascript') this.code = '//Start your JS code';
    else if (val == 'json') this.code = '//Start your JSON code';
    else if (val == 'html') this.code = '<!-- Start your HTML code -->';
  }
  getCode() {
    return (
      // tslint:disable-next-line: max-line-length
      '<html><!-- // SAMPLE CODE-->\n<head>\n	<!-- HTML comment -->\n	<style type="text/css">\n		/* CSS comment */\n	</style>\n	<script type="javascript">\n		// JavaScript comment\n	</' +
      'script>\n</head>\n<body></body>\n</html>'
    );
  }
}
