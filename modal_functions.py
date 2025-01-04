import modal
import sys
import json
import traceback

stub = modal.Stub("web-scraper")

@stub.function(gpu="L40S")
def analyze_content(content):
    try:
        print(f"Received content for analysis", file=sys.stderr)
        # This is a placeholder for actual AI analysis
        html_analysis = f"HTML Analysis: The page contains {len(content['html'])} characters."
        link_analysis = f"Link Analysis: Found {len(content['links'])} links on the page."
        return {
            "html_analysis": html_analysis,
            "link_analysis": link_analysis,
            "links": content['links']
        }
    except Exception as e:
        error_message = f"Error in analyze_content: {str(e)}\n{traceback.format_exc()}"
        print(error_message, file=sys.stderr)
        return {"error": str(e), "traceback": traceback.format_exc()}

if __name__ == "__main__":
    try:
        print("Starting modal_functions.py", file=sys.stderr)
        content = json.loads(sys.argv[1])
        print(f"Received content", file=sys.stderr)
        with stub.run():
            result = analyze_content(content)
        print(json.dumps(result))
        print("Finished modal_functions.py", file=sys.stderr)
    except json.JSONDecodeError as e:
        print(f"Error decoding input JSON: {str(e)}", file=sys.stderr)
        print(json.dumps({"error": f"JSON decode error: {str(e)}"}))
    except Exception as e:
        error_message = f"Error in modal_functions.py: {str(e)}\n{traceback.format_exc()}"
        print(error_message, file=sys.stderr)
        print(json.dumps({"error": str(e), "traceback": traceback.format_exc()}))

