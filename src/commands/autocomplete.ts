import {Command, flags} from '@oclif/command'
import * as fs from "fs";
import * as path from "path";

export default class ListProj extends Command {
  static description = "Install completion file";

  static examples = [
    `$ td autocomplete --zsh /usr/share/zsh/site-functions/`
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    zsh: flags.boolean({
      description: "Install zsh completion"
    })
  };

  static args = [{
    name: "dir",
    description: "Install completion files to specific directory",
    required: true
  }];

  async run() {
    const { flags, args } = this.parse(ListProj);

    try {
      if (flags.zsh) {
        const target = path.join(args.dir, "_td");
        fs.copyFileSync(path.join(__dirname, "../../autocomplete/_td"), target);
        this.log(`Completion file installed to ${target}.\nMake sure ${args.dir} is in $fpath environment.\nStart a new zsh shell to put it into effect.`);
      }
      else {
        this.error("Shell flag required. See --help for details");
      }
    }
    catch (error) {
      this.error(error);
    }
  }
}
