import {Command, flags} from '@oclif/command'
import { parseNumbers, readTaskJson, writeTaskJson } from "../utils/task";
import { checkTaskExistence } from "../utils/config";
import { TaskType, undoTasks } from "task.json";

export default class Undo extends Command {
  static description = 'Undo tasks';

  static examples = [
    `$ tj undo 1 2`,
    `$ tj undo --removed 1 2`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
		removed: flags.boolean({
			char: "R",
			description: "restore removed tasks"
		})
  };

  // Allow multiple arguments
  static strict = false;

  static args = [{
    name: "NUM...",
    description: "undo specific done or removed tasks"
  }];

  async run() {
    const { argv, flags } = this.parse(Undo);

    checkTaskExistence(this.error);

    const taskJson = readTaskJson();
		const type: TaskType = flags.removed ? "removed" : "done";
    const indexes = parseNumbers(argv, taskJson[type].length, this.error);
    undoTasks(taskJson, type, indexes);

    writeTaskJson(taskJson);

    this.log(`Undo ${new Set(indexes).size} task(s)`);
  }
}
