import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { IDEService } from "src/app/shared/services/IDE/ide.service";
@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.scss']
})
export class AceEditorComponent implements AfterViewInit {
  @ViewChild("editor") //knows that there is a DOM element with editor ID
  // @ViewChild only initalized with implements AfterViewInit and ngAfterViewInit()
  private editor!: ElementRef<HTMLElement>;
  language: string = "javascript"; // default language for ace-editor
  theme: string = "chrome"; // default theme for ace-editor
  aceEditor: any;
  stdInput: string = '';
  message: any;
  stderr: any;
  stdout: any;
  loading = false;
  ngAfterViewInit(): void { //insted of using ngAfterViewInit() if we use ngOnInit() it will throw an error of undefine.
    //A callback method that is invoked immediately after Angular has completed initialization of a component's view. It is invoked only once when the view is instantiated.
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue("// Type your javascript code...");
    this.aceEditor.session.setMode(`ace/mode/${this.language}`);
    this.aceEditor.setTheme(`ace/theme/${this.theme}`);
  }
  constructor(private _service:IDEService) { }

  ngOnInit(): void {
    this._service.emitUser();
    this._service
      .listenToServer("compilation-result")
      .subscribe(this.displayResult);
  }
  onRun() {
    if (this.loading) return;

    let lang_id;
    if (this.language === "javascript") {
      lang_id = 63;
    } else if (this.language === "python") {
      lang_id = 71;
    }

    let code = this.aceEditor.getValue();

    let body = {
      language_id: lang_id,
      source_code: btoa(code),
      stdin: btoa(this.stdInput),
    };
    this.loading = true;
    this._service.runCode(body).subscribe(
      (res) => {console.log(res);},
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onSubmit() {}

  changeLanguage() {
    this.aceEditor.session.setMode(`ace/mode/${this.language}`);
    this.stdInput = "";
    let comment;

    if (this.language === "javascript") {
      comment = "// Type your javascript code...";
    } else if (this.language === "python") {
      comment = "## Type your python code...";
    }

    this.aceEditor.session.setValue(comment, -1);
  }
  changeTheme() {
    this.aceEditor.setTheme(`ace/theme/${this.theme}`);
  }

  displayResult = (result: { stderr: string | null; message: string; stdout: string; }) => {
    if (result.stderr !== null) {
      this.stderr = atob(result.message) + "\n\n" + atob(result.stderr);
      this.stdout = "Error!";
    } else {
      this.stderr = result.message
        ? atob(result.message)
        : "Compiled successfully\n";
      this.stdout = result.stdout ? atob(result.stdout) : "null";
    }
    this.loading = false;
  };

}
